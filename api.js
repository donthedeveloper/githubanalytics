import { Octokit, App } from "octokit";

const octokit = new Octokit({
    auth: import.meta.env.TEST_API_KEY
});

const arrayOfBranchesAndCommits = [];

const branches = await octokit.request('GET /repos/donthedeveloper/githubanalytics/branches', {
  owner: 'donthedeveloper',
  repo: 'githubanalytics',
  headers: {
    accept: 'application/vnd.github+json'
  }
});

console.log(branches)

async function getCommitsPerBranch() {
  const listOfBranchesArray = branches.data.map(branch => {
    return branch.name;
  });

  for (let branch of listOfBranchesArray) {
    const commits = await octokit.request(`GET /repos/donthedeveloper/githubanalytics/commits?sha=${branch}`, {
      owner: 'donthedeveloper',
      repo: 'githubanalytics',
      headers: {
        accept: 'application/vnd.github+json'
      }
    });

    arrayOfBranchesAndCommits.push({
      branch: branch,
      data: commits
    });
  };

  return arrayOfBranchesAndCommits;
};

const commits = await octokit.request('GET /repos/donthedeveloper/githubanalytics/commits', {
  owner: 'donthedeveloper',
  repo: 'githubanalytics',
  headers: {
    accept: 'application/vnd.github+json'
  }
});

const userRepos = await octokit.request('GET /users/donthedeveloper/repos', {
  username: 'donthedeveloper',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

getCommitsPerBranch();

export { branches, commits, userRepos, arrayOfBranchesAndCommits };