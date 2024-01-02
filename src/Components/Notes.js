import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const { notes, getnotes, updatenote } = context
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getnotes()
        }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line 
    }, [])

    const updatecurrentnote = (currentnote) => {
        ref.current.click()
        setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag, })

    }
    const ref = useRef(null)
    const refClose = useRef(null)


    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "Default" })

    const handleclick = (e) => {
        e.preventDefault();
        // console.log("UPdating a note",note)
        updatenote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showalert("Updated successfully", "success")
        // console.log(note)    
        // addnote(note.title, note.description, note.tag)
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container">

                <Addnote showalert={props.showalert} />
                <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" name='etitle' id="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} minLength={5} required />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" name='edescription' id="edescription" value={note.edescription} onChange={onchange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" name='etag' id="etag" value={note.etag} onChange={onchange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {notes.map(note => {
                        return <NoteItem key={note._id} updatecurrentnote={updatecurrentnote} note={note} showalert={props.showalert} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
