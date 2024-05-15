import React from "react";
import "./HomeForm.css";
import { useOutletContext } from "react-router-dom";
import { Octokit } from "octokit";

function HomeForm() {

  const [searchRepo, setSearchRepo] = useOutletContext();

  async function getRepoBranchesAPICall(repoOwner, repoName) {
    const octokit = new Octokit();

    const response = await octokit.request(`GET /repos/${repoOwner}/${repoName}/branches`, {
      owner: repoOwner,
      repo: repoName,
      headers: {
        accept: 'application/vnd.github+json'
      }
    });
    console.log(response)
    return response;
  }

  React.useEffect(() => {
    const homeForm = document.getElementById("home-form-container");
    const urlInput = document.getElementById("home-form-input");

    homeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // The URL constructor stores the URL as an object. https://github.com/donthedeveloper/githubanalytics for example
      // would be stored in this format:
      
      // {
      //   hash: "",
      //   host: "github.com",
      //   href: "https://github.com/donthedeveloper/githubanalytics",
      //   origin: "https://github.com/",
      //   password: "",
      //   pathname: "/donthedeveloper/githubanalytics",
      //   port: "",
      //   protocol: "https:",
      //   search: "",
      //   searchParams: { size: 0 },
      //   username: ""
      // }

      const urlFormData = new FormData(homeForm);
      const repoUrl = new URL(urlFormData.get("home-form-input"));
      const repoUrlPathnameArr = repoUrl.pathname.split("/");

      getRepoBranchesAPICall(repoUrlPathnameArr[1], repoUrlPathnameArr[2]);

    });
    
  }, [])

  return (
    <div className="home-container">
      <form className="home-form-container" id="home-form-container">
        <label 
          className="home-form-label"
          htmlFor="home-form-input"
        >
          Enter a Github repo URL to get started
        </label>
        <input
            className="home-form-input"
            id="home-form-input"
            name="home-form-input"
            type="url"
            placeholder="Starting with https//..."
          />
        <button
          className="home-form-submit-btn"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  )
};

export default HomeForm;