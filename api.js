import { Octokit, App } from "octokit";

const octokit = new Octokit({
    auth: import.meta.env.TEST_API_KEY
});

export const branches = await octokit.request('GET /repos/donthedeveloper/githubanalytics/branches', {
  owner: 'donthedeveloper',
  repo: 'githubanalytics',
  headers: {
    accept: 'application/vnd.github+json'
  }
});

export const commits = await octokit.request('GET /repos/donthedeveloper/githubanalytics/commits', {
  owner: 'donthedeveloper',
  repo: 'githubanalytics',
  headers: {
    accept: 'application/vnd.github+json'
  }
});

export const userRepos = await octokit.request('GET /users/donthedeveloper/repos', {
  username: 'donthedeveloper',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
})

export default branches;
