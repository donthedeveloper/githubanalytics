import React from "react";
import GitgraphComponent from "/src/components/GitgraphComponent/GitgraphComponent";

function Repos() {
  return (
    <>
      <h1>Repos</h1>
      <p>This is a placeholder. This page should show a list of repos from the logged in user.</p>
      <p>To see a specific Gitgraph, you'll have to click on the repo.</p>
      <br />
      <br />
      <br />
      <GitgraphComponent />
    </>
  )
};

export default Repos;