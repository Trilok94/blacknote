import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const About = () => {
    const note = useContext(NoteContext)
    return (
        <>
            <div className="container">
                this is obj1.name : {note.obj1.name}<br/>
                this is obj1.type : {note.obj1.type}<br/>
                this is obj2.name : {note.obj2.name}<br/>
                this is obj2.name : {note.obj2.type}<br/>
                this is a variable : {note.variable}<br/>
                this is a func_hello function : {note.func_hello()} this is not visible cause it is function<br/>
                this is a var_into_value function : {note.var_into_value}
            </div>
        </>
    )
}

export default About;