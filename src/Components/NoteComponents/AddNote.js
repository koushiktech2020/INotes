import React, { useState } from "react";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");

  const insertNote = async (e) => {
    e.preventDefault();
    let dataValues = {
      note_title: title,
      note_desc: desc,
      note_tag: tag,
    };
    //console.log(dataValues);
    let result = await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataValues),
    });
    result = await result.json();
    //result.json is come from back end and store in result variable
    //console.log(result.message);
    alert(result.message);
    setTitle("");
    setDesc("");
    setTag("");
  };
  return (
    <div className="container">
      <form className="m-5" onSubmit={insertNote}>
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">
            Note Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="noteTitle"
            aria-describedby="noteTitleHelp"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="noteDesc" className="form-label">
            Note Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="noteDesc"
            aria-describedby="noteDescHelp"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="noteTag" className="form-label">
            Note Tag:
          </label>
          <input
            type="text"
            className="form-control"
            id="noteTag"
            aria-describedby="noteTagHelp"
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
