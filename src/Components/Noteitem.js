import { useContext } from "react";
import React from "react";
import noteContext from "../Context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3">  
       <div className="card my-3 shadow-lg custom-card"
         style={{ backgroundColor: "transparent", // Transparent background
         border: "2px solid rgba(255, 255, 255, 0.5)", // Bold and faded border
         borderRadius: "8px", //  add rounded corners 
         boxShadow: "20px 20px 20px rgb(242, 3, 3)", // Add shadow effect
      }}>
        <div className="card-body text-light">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
          {note.description}</p>
          <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id); props.showAlert(" Deleted Successfully","success");}}></i>
          <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note)}}></i>
        
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
