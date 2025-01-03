import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props) =>{
    const host = "http://localhost:5000";
    const notesInitial = []

        const [notes, setnotes] = useState(notesInitial)

        // Get all Note
        
        const getNotes =async()=>{
        
          //Api Call
          const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
          const json = await response.json()
          console.log(json);
          
          setnotes(json)

        }
        const addNote=async(title, description,tag)=>{
          
          //Api Call
          const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag}),
          });
          const note = await response.json();     
          setnotes(notes.concat(note))          

        }
        // Delete a  Note

        const deleteNote=async(id)=>{
          //Api call.
          
          const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem('token')
            },            
          });
         const json = response.json();
         console.log(json);

          console.log("deleating the note with id" + id);
          const newNote = notes.filter((note)=>{return note._id!==id})
          setnotes(newNote)
          
        }

        // Edit a Note
        const editNote= async(id, title,description,tag)=>{
          //Api Call
          const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description,tag}),
          });
         const json = response.json();
         console.log(json);
          let newNotes = JSON.parse(JSON.stringify(notes))
          //Logic to edit in client
          for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;

            }
           
            
          }
          setnotes(newNotes);
          
        }
    return(
        <NoteContext.Provider value = {{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
        )
}

export default NoteState;