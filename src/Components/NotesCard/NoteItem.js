import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import NoteContext from "../../Context/Notes/NoteContext";

const NoteItem = (props) => {

  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const { note ,updateNote} = props;
  const { mode } = props;
  const inputClass = mode === "light" ? "ninput-light" : "ninput-dark";

  return (
    <div className="col-md-3" style={{color:"black"}}>
      <div className={`card my-3  ${inputClass}`}  >
        <div className="card-body">
          <div className="d-flex align-items-baseline justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div className="cart-button">
            <MdDelete className="mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Deleted successfully" , "success");}} />
            <MdEdit className="mx-2" onClick={() => {updateNote(note)}} />
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
