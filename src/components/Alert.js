import React from 'react'
import noteContext from '../context/notes/NoteContext';
import { useContext } from 'react';
function Alert(props) {
    const context = useContext(noteContext)
    // destructuring the context 
    let { alert } = context
    return (
        <>
        <div  style={{ height: '50px' }}>
            {alert &&
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{alert.type}: </strong>{alert.msg}
                </div>}
        </div>
        </>
    )
}

export default Alert;