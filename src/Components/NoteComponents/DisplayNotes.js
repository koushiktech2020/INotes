import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import "./DisplayNotes.css";

const DisplayNotes = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      const url = `http://localhost:5000/api/notes?token=${token}`;
      try {
        const response = await fetch(url);
        //console.log(response);
        const resultData = await response.json();
        //console.log(resultData);
        setData(resultData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [data]);
  const editmodalHanddler = (val) => {
    //console.log(val._id);
    ref.current.click();
    setId(val._id);
    setTitle(val.note_title);
    setDesc(val.note_desc);
    setTag(val.note_tag);
  };

  const changeNoteHandler = async (e) => {
    e.preventDefault();
    //console.log("hello---", id);
    let dataValues = {
      note_title: title,
      note_desc: desc,
      note_tag: tag,
    };
    let noteId = id;
    //console.log(noteId);
    let url = `http://localhost:5000/api/notes/${noteId}`;
    let resultData = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataValues),
    });
    const responseMessage = await resultData.json();
    //console.log(responseMessage.message);
    alert(responseMessage.message);
    //history.push("/NoteList");
  };

  const deleteHandler = async (val) => {
    //console.log(val._id);
    let noteId = val._id;
    let url = `http://localhost:5000/api/notes/${noteId}`;
    //console.log(url);
    let responseData = await fetch(url, {
      method: "DELETE",
    });
    const responseMessage = await responseData.json();
    //console.log(responseMessage.message);
    alert(responseMessage.message);
  };
  return (
    <div className="container">
      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Your Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="m-5">
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={changeNoteHandler}
              >
                Update Note
              </button>
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {data.length > 0 ? (
        <table className="table my-5">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th className="text-center" scope="col " colSpan="2">
                Operation
              </th>
            </tr>
          </thead>
          {data.map((item) => (
            <tbody key={item._id}>
              <tr>
                <td>{item.note_title}</td>
                <td>{item.note_desc}</td>
                <td>{item.note_tag}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      editmodalHanddler(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm w-75 btn-danger"
                    onClick={() => {
                      deleteHandler(item);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <h1 className="text-center my-5">No Notes to Show</h1>
      )}
    </div>
  );
};

export default DisplayNotes;
