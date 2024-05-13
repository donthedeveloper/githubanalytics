import React from "react";
import "./Branches.css";
import { branches } from "/api.js";

function Branches() {
  
  const [menuExpanded, changeMenuExpanded] = React.useState(false);
  const [repoBranches, setRepoBranches] = React.useState(null);

  function populateRepoBranches() {
    setRepoBranches(prev => {
      let repoBranchArr = [];
      branches.data.forEach((currBranch, index) => {
        // Each branch is pushed with an isSelected key, which users can use to toggle a visual highlight on said branch.
        // The index key will be used to match the element with its matching object in state.
        repoBranchArr.push(
          {            
            name: currBranch.name,
            index: [index],
            isSelected: false
          }
        )
      });
      return repoBranchArr;
    });
  };

  function toggleAccordionMenu() {
    changeMenuExpanded(!menuExpanded);
  };

  React.useEffect(() => {
    populateRepoBranches();
  }, []);

  const branchChildrenEl = repoBranches 
    ? repoBranches.map(currBranch => {
      return <p key={currBranch.index} data-index={currBranch.index}>{currBranch.name}</p>
    }) 
    : null;

  return (
    <>
      <div className="accordion-container">
        <div className="accordion-header" onClick={() => toggleAccordionMenu()}>
          <p>Branches</p>
          {menuExpanded 
            ? <i className="fa-solid fa-caret-down"></i> 
            : <i className="fa-solid fa-caret-right"></i>}
        </div>
        {menuExpanded && <div className="accordion-items">
          {branchChildrenEl}
        </div>}
      </div>
    </>
  )
};

export default Branches;