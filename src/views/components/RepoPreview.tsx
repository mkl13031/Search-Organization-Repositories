import { repoResponse } from '../../core/model/RepoModel';

const RepoPreview = ({ repo }: { repo: repoResponse }) => {

  return (
    <div className='repo-box'>
      <a href={repo.html_url}>{repo.name}</a>
      <div style={{ flex: 1, overflow: 'hidden'}}>
        <h5>{repo.description}</h5>
      </div>
      <h5 style={{color: '#000055'}}>{repo.language}</h5>
    </div>
  );
};

export default RepoPreview;