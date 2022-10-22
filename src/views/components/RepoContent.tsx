import githubApi from '../../core/api/github';
import RepoPreview from './RepoPreview';
import { repoResponseStatus } from '../../core/enum/repoResponseStatus';
import useGlobalContext from '../../core/lib/globalContext';
import useWindowDimensions from '../../core/lib/useWindowDimensions';

const RepoContent = () => {
  const { height: windowHeight } = useWindowDimensions();
  let loadMoreLock = false;
  const {
    repos,
    setRepos,
    repoPage,
    setRepoPage,
    status,
    organization,
    type,
    sort,
    direction,
  } = useGlobalContext();

  const loadMoreRepo = async () => {
    loadMoreLock = true;
    const result = await githubApi.getRepoByOrg(organization, 30, repoPage + 1, type, sort, direction);

    if (result.status === 200 && result.data) {
      setRepos((pre) => { return [...pre, ...result.data || []]; });
      setRepoPage(repoPage + 1);
    }
    loadMoreLock = false;
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < windowHeight * 2 && !loadMoreLock) {
      loadMoreRepo();
    }
  };
  switch (status) {
    case repoResponseStatus.LOADING:
      return (<h1>Loading...</h1>);
    case repoResponseStatus.NOT_FOUND:
      return (<h1>Not Found</h1>);
    case repoResponseStatus.ERROR:
      return (<h1>Something wrong, please try again</h1>);
    case repoResponseStatus.SUCCESS:
      return (
        <div
          style={{ height: '70vh', width: '80vw', overflowY: 'auto' }}
          onScroll={onScroll}>
          {repos.map(repo =>
            (<RepoPreview key={repo.id} repo={repo} />))}
          {repos.length === 0 && <h1>Empty</h1>}
        </div>
      );
    default:
      return null;
  }
};

export default RepoContent;