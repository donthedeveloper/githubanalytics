import React from "react";
import { useOutletContext } from "react-router-dom";

function HomeForm() {

  const [searchRepo, setSearchRepo] = useOutletContext();

  React.useEffect(() => {
    const homeForm = document.getElementById("home-form-container");
    const urlInput = document.getElementById("home-form-input");

    homeForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(homeForm);

      setSearchRepo(formData.get("home-form-input"))
    });
    
  }, [])

  return (
    <div className="home-container">
      <div className="home-logo-container">
      </div>
      <form className="home-form-container" id="home-form-container">
        <label>
          Enter a Github repo URL to get started
          <input
            className="home-form-input"
            id="home-form-input"
            name="home-form-input"
            type="url"
            placeholder="Starting with https//..."
          />
        </label>
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