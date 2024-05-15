import { Octokit } from "octokit";

async function getGithubUserInfo(octokitObj) {
  const githubUserInfo = await octokitObj.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  return githubUserInfo;
}

export { getGithubUserInfo };