import React from "react";
import { Gitgraph } from "@gitgraph/react";
import { commits, branches } from "/api.js";

function GitgraphComponent() {

  const mainCommits = [];

  function mapCommits() {
    commits.data.reverse().forEach(commit => {
      mainCommits.push({
        subject: commit.commit.message,
        author: commit.commit.author.name
      })
    })
  }

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