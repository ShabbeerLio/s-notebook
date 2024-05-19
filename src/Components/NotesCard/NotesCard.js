import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "../AddNote/AddNote";
import { useNavigate } from "react-router-dom";
import "./NoteCard.css"

const NotesCard = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      history("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const { mode } = props;

  const inputClass = mode === "light" ? "input-light" : "input-dark";
  const einputClass = mode === "light" ? "einput-light" : "einput-dark";


  return (
    <>
      <AddNote showAlert={props.showAlert} mode={props.mode} toggleMode={props.toggleMode}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div className="modal-dialog">
          <div className={`modal-content ${einputClass}`} >
            <div className="modal-header" style={{ borderBottom: "1px solid #3c3c3c" }}>
              <h5 className="modal-title" id="exampleModalLabel" >
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${inputClass}`}
                    // style={{ color: "white", backgroundColor: "#424242", border: "none" }}
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className={`form-control ${inputClass}`}
                    // style={{ color: "white", backgroundColor: "#424242", border: "none" }}
                    name="edescription"
                    id="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className={`form-control ${inputClass}`}
                    // style={{ color: "white", backgroundColor: "#424242", border: "none" }}
                    name="etag"
                    id="etag"
                    onChange={onChange}
                    required
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{display:"flex",flexWrap:"nowrap", borderTop: "1px solid #3c3c3c" }}>
              <button
                ref={refClose}
                type="button"
                className="update-button"
                data-bs-dismiss="modal"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="update-button"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes todisplay"}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} mode={props.mode} toggleMode={props.toggleMode} />
        })}
      </div>
    </>
  );
};

export default NotesCard;
