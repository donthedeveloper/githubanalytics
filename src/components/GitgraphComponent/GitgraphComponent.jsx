import React from "react";
import { Gitgraph } from "@gitgraph/react";
import { commits, branches, arrayOfBranchesAndCommits } from "/api.js";

function GitgraphComponent() {

  const [repoBranches, setRepoBranches] = React.useState([]);
  
  React.useEffect(() => {
    setRepoBranches(prevVal => {
      const listOfBranchesArray = branches.data.map(branch => {
        return branch.commit.sha;
      })

      return listOfBranchesArray
    });
  }, []);

  console.log(arrayOfBranchesAndCommits)

  const mainCommits = [];

  function mapCommits() {
    commits.data.reverse().forEach(commit => {
      mainCommits.push({
        subject: commit.commit.message,
        author: commit.commit.author.name
      })
    })
  };

  mapCommits();

  return (
    <Gitgraph>
      {(gitgraph) => {
        const main = gitgraph.branch("main");
        mainCommits.forEach(commitObj => {
          main.commit(commitObj);
        })
      }}
    </Gitgraph>
  )
};

export default GitgraphComponent;