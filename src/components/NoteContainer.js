import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'
import { useNavigate } from "react-router-dom";

function NoteContainer(props) {
    const Context = useContext(noteContext);
    const navigate = useNavigate()
    // destructuring Context 
    const { notes, fetchalldata } = Context
    useEffect(() => {
        if(sessionStorage.getItem('token')){
            fetchalldata()

        }
        else{
            navigate('/login')
        }
    }, [])
    
    return (
        <>
            <div style={{marginTop: '20px'}} className="container">
                <h1>Your Notes</h1>
                <div className=" row">
                    {notes.map((note) => {
                        // return <NoteItem key={note._id} title={note.title} description={note.description} date={note.date} />
                        return <NoteItem key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default NoteContainer;