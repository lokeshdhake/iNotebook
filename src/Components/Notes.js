import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useHistory } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let history = useHistory();
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  useEffect(() => {
    if(localStorage.getItem('token')){
      console.log('token');
      getNotes();
    }
    else{
      history.push("/login")
    }
    // eslint-disable-next-line
  }, []);
  
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle : currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    
  };
  
  const ref = useRef(null);
  const refClose = useRef(null);
// Handle click for updating the note
  const handleClick = (e) => {
    console.log("update")
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    ;props.showAlert(" Updated Successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5"  id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
             
              <form className=" my-3">
                <div className="form-group my-3"> 
                  <label htmlFor="title" >Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button
                 ref ={refClose} type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 light-text ">
        <h2>Your Notes.</h2>
        <div className="container">
        {notes.length ===0 && "No notes to display."}</div>
        
        {notes.map((note) => {
            return (
              <Noteitem
                key={note._id}
                showAlert={props.showAlert}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        
      </div>
    </>
  );
};

export default Notes;
