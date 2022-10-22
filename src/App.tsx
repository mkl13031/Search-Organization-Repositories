import { useEffect, useRef, useState } from 'react';
import githubApi, { repoDirection, repoSort, repoType } from './core/api/github';
import { repoResponseStatus } from './core/enum/repoResponseStatus';
import { GlobalContext } from './core/lib/globalContext';
import { repoResponse } from './core/model/RepoModel';
import RepoContent from './views/components/RepoContent';
import Dropdown from './views/components/Dropdown';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {
  const [organization, setOrganization] = useState('');
  const [repos, setRepos] = useState<repoResponse[]>([]);
  const [repoStatus, setRepoStatus] = useState(repoResponseStatus.IDLE);
  const [repoPage, setRepoPage] = useState(1);
  const [type, setType] = useState<repoType>();
  const [sort, setSort] = useState<repoSort>();
  const [direction, setDirection] = useState<repoDirection>();
  const scrollView = useRef<HTMLDivElement>(null);

  const clearClick = () => {
    setType(undefined);
    setSort(undefined);
    setDirection(undefined);
  };

  const searchClick = async () => {
    setRepoStatus(repoResponseStatus.LOADING);
    setRepoPage(1);
    const result = await githubApi.getRepoByOrg(organization, 30, 1, type, sort, direction);
    if (result.status === 200 && result.data) {
      setRepoStatus(repoResponseStatus.SUCCESS);
      setRepos(result.data);
      if (scrollView.current) {
        scrollView.current.scrollTo(0, 0);
      }
    } else if (result.status === 404) {
      setRepoStatus(repoResponseStatus.NOT_FOUND);
    } else {
      setRepoStatus(repoResponseStatus.ERROR);
    }
  };

  const initType = {
    repos,
    setRepos,
    repoPage,
    setRepoPage,
    status: repoStatus,
    setStatus: setRepoStatus,
    organization,
    setOrganization,
    type,
    setType,
    sort,
    setSort,
    direction,
    setDirection,
  };

  useEffect(() => {
    if (organization !== '') { searchClick(); }
  }, [type, sort, direction]);

  return (
    <GlobalContext.Provider value={initType}>
      <div className="App-background">
        <h1>Search Organization Repositories</h1>
        <input
          value={organization}
          onKeyDown={(e) => e.key === 'Enter' && searchClick()}
          onChange={(e) => setOrganization(e.currentTarget.value)}
          className='inputfield' />
        <div className='search-result'>
          <Dropdown displayValue='Type' values={Object.values(repoType)} selected={type} setSelected={setType} />
          <Dropdown displayValue='Sort' values={Object.values(repoSort)} selected={sort} setSelected={setSort} />
          <Dropdown displayValue='Direction' values={Object.values(repoDirection)} selected={direction} setSelected={setDirection} />
          <Button
            className='click-button'
            variant="primary"
            onClick={clearClick}>
            Clear Filter
          </Button>
          <Button
            className='click-button'
            variant="primary"
            onClick={searchClick}>
            Search
          </Button>
        </div>
        <RepoContent />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

