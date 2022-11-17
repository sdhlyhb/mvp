import React, { useEffect, useState } from "react";
import axios from "axios";

function JobWebsites() {
  const [shortcutUrls, setShortcutsUrls] = useState([]);
  const [newShortcut, setNewShortcut] = useState("");
  const [newKeywords, setNewKeywords] = useState("");

  const getUrls = async () => {
    try {
      const response = await axios.get(
        "/api/shortcuts"
      );
      console.log("this is urls data:", response.data);
      setShortcutsUrls(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUrls();
  }, [])




  const handleSubmitUrl = async (e) => {
    e.preventDefault();
    const shotcutObj = {
      search_url: newShortcut,
      keywords: newKeywords,
    };

    try {
      const response = await axios.post("/api/shortcuts", shotcutObj);
      console.log("response:", response.data);
      getUrls();
      console.log("urls:", shortcutUrls);
      setNewShortcut("");
      setNewKeywords("");
    } catch (err) {
      console.log("Err adding new shortcut url!", err);
    }
  };

  const baseUrls = shortcutUrls?.map(urlObj => urlObj.search_url.split("/jobs")[0]);

  return (
    <div className="search-shortcuts">
      <h3>Searching Shortcuts</h3>
      {baseUrls?.map((url, i) => (<li key={i}>
        <img
          width="20"
          height="20"
          src={"//f5.allesedv.com/20/" + `${url}`}
        />
        <a href={shortcutUrls[i]}>
          {shortcutUrls[i].keywords}

        </a>
      </li>))}

      <div>
        <input
          type="text"
          name="shortcut"
          placeholder="Enter the shortcut url..."
          value = {newShortcut}
          onChange={(e) => setNewShortcut(e.target.value)}
        />
        <input
          type="text"
          name="search-keywords"
          placeholder="Enter the keywords of your search..."
          value = {newKeywords}
          onChange={(e) => setNewKeywords(e.target.value)}
        />

        <button onClick={(e) => handleSubmitUrl(e)}>Add New Shortcut</button>
      </div>
    </div>
  );
}

export default JobWebsites;
