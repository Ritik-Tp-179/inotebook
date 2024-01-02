import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addnote } = context

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddnote = (e) => {
        e.preventDefault();
        // console.log(note)    
        addnote(note.title, note.description, note.tag)
        props.showalert("Note added successfully","success")
        setNote({title: "", description: "", tag: "" })
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' id="title" aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' id="description" value={note.description} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" name='tag' id="tag" value={note.tag} onChange={onchange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddnote}>Add note</button>
            </form>
        </div>
    )
}

export default Addnote
