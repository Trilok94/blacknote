import React, { useContext } from 'react'
import '../../src/NoteItem.css';
import noteContext from '../context/notes/NoteContext';
export default function NoteItem(props) {

    const context = useContext(noteContext)
    //destructuring the context
    let { deleteNote, setAnebtn, setAnehead, setExponid, setDplay, setTitletext, setDesctext, setTagtext, setReqNote, reftitle, refdesc, reftag } = context
    // when click on edit button 
    const editNoteForm = () => {
        setAnehead('Edit your note now :')
        setAnebtn('Submit')
        setDplay('inline')
        // setTitletext(note.title)
        // setDesctext(note.description)
        // setTagtext(note.tag)
        reftitle.current.value = note.title
        refdesc.current.value = note.description
        reftag.current.value = note.tag
        setReqNote({ title: note.title, description: note.description, tag: note.tag }) // can export the event for handleonchange, can by state 
        setExponid(note._id)


    }
    //destructuring the props 
    // let { title, description, date } = props;
    let { note } = props;
    return (
        <>
            <div className="col-md-3 my-3">
                <div className="card text-bg-dark " style={{ maxWidth: "18rem" }}>
                    <div className="card-header d-flex">
                        <div className="dateprop me-3">{new Date(note.date).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}
                        </div>

                        <span className='mx-1 iconimg'><img height={'18px'} width={'18px'} src="https://cdn-icons-png.flaticon.com/512/3177/3177433.png" alt="del" onClick={() => { deleteNote(note._id) }} /></span>
                        <span className='mx-1 iconimg'><a href='#conane'><img height={'18px'} width={'18px'} src="https://cdn-icons-png.flaticon.com/128/420/420140.png" alt="edit" onClick={editNoteForm} /></a></span>

                    </div>
                    <div className="card-body">
                        <h5 style={{ textAlign: 'center' }} className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p style={{ textAlign: 'right', color: 'grey' }} className="card-text"><strong><u>{note.tag}</u></strong></p>
                    </div>

                </div>
            </div>
        </>
    )
}