import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000"
  const noteinitial = []
  const [notes, setNotes] = useState(noteinitial)


  const getnotes = async() => {
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      }
    })
    const json = await response.json()
    // console.log(json)
    setNotes(json)
    

  }

  const addnote = async(title, description, tag) => {
    // console.log(notes)
    // TODO : API CALL
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json()
    setNotes(notes.concat(note))
    

  }

  const updatenote = async(id,title,description,tag) => {

    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    })
    // const json = response.json()


    let newNote = JSON.parse(JSON.stringify(notes))
    // Logic to delete
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if( element._id === id){
        newNote[index].title=title;  
        newNote[index].description=description;
        newNote[index].tag=tag;
        break;
      }
    }
setNotes(newNote)

  }

  const deletenote = async(id) => {
    // API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      }
      // body: JSON.stringify({title,description,tag})
    })
    const json = response.json()
    console.log(json)

    console.log("Deleting a note with id" + id)
    const newNote = notes.filter(note => { return note._id !== id })
    setNotes(newNote)


  }
  return (
    <NoteContext.Provider value={{ notes, getnotes, setNotes, addnote, updatenote, deletenote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;