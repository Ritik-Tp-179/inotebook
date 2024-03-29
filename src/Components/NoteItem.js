import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deletenote } = context
    const { note,updatecurrentnote } = props
    // console.log(note)
    return (
        <div className='col-md-3'> 
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex">
                
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-solid fa-pen-to-square my-1 mx-3"  onClick={()=>{updatecurrentnote(note); }}></i>
                    <i className="fa-solid fa-trash my-1 mx-3" onClick={()=>{deletenote(note._id);props.showalert("Deleted Successfully","success")}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
