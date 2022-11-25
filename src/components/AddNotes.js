import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
function AddNotes() {
  const Context = useContext(noteContext);
  // destructuring Context 
  const { addNote, anebtn, anehead, aneTitle, aneDesc, editNote, exponid, setAnehead, setAnebtn, dplay, setDplay, titletext, desctext, tagtext, setTagtext, setDesctext, setTitletext, reqNote, setReqNote, reftitle, refdesc, reftag } = Context;

  console.log(reqNote)

  // when click add note button 
  const handleOnClick = (event) => {
    event.preventDefault()

    const btnhtml = document.getElementById('btnane').innerHTML
    if (btnhtml === 'Add Note') {
      addNote(reqNote.title, reqNote.description, reqNote.tag)

      setReqNote({ title: "", description: "", tag: "" })
      // to do : remove the value to none
      resetValueTonull()
    } else {
      // edit note 

      editNote(exponid, reqNote.title, reqNote.description, reqNote.tag)
      // to do : add a button for descard 
      resetFormToDefault()

    }
  }

  const resetValueTonull = () => {
    // setTitletext('')
    // setDesctext('')
    // setTagtext('')
    reftitle.current.value = ''
    refdesc.current.value = ''
    reftag.current.value = ''

  }
  const resetFormToDefault = () => {
    setAnehead('Add your Next Note :')
    setAnebtn('Add Note')
    resetValueTonull()
    setDplay('none')
    setReqNote({ title: "", description: "", tag: "" })
  }
  const handleOnChange = (event) => {
    // if (event.target.id === 'title'){setTitletext(event.target.value)}
    // if (event.target.id === 'description'){setDesctext(event.target.value)}
    // if (event.target.id === 'tag'){setTagtext(event.target.value)}

    // console.log(event.target.id)
    setReqNote({ ...reqNote, [event.target.name]: event.target.value })
    // setReqNote({title: "", description: "", tag: "", [event.target.name]: event.target.value})
  }
  return (



      <div id='conane' className="container" style={{marginTop: '100px'}}>
        <h1 >{anehead}</h1>
        {/* <h1 id='conane'>Add a Note below : </h1> */}
        <form method='post' >
          <div style={{ border: "2px solid black", borderRadius: "20px" }} className={"px-3 py-3"} >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              {/* <input type="text" className="form-control" id="title" name="title" placeholder='Add your Title' onChange={handleOnChange} value={titletext} /> --> onchange attribs */}
              <input type="text" className="form-control" id="title" name="title" placeholder='Add your Title' ref={reftitle} onChange={handleOnChange} />

            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              {/* <textarea  className="form-control" id="description" name='description' rows="4" placeholder='Add your Description' onChange={handleOnChange} value={desctext} ></textarea> --> onchange attribs*/}
              <textarea className="form-control" id="description" name='description' rows="4" placeholder='Add your Description' ref={refdesc} onChange={handleOnChange} ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">tag</label>
              {/* <input type="text" className="form-control" id="tag" name="tag" placeholder='Add your Tag' onChange={handleOnChange} value={tagtext} /> --> onchange attribs */}
              <input type="text" className="form-control" id="tag" name="tag" placeholder='Add your Tag' ref={reftag} onChange={handleOnChange} />

            </div>
          </div>
          <button type="submit" id='btnane' className="btn btn-primary my-3" onClick={handleOnClick}>{anebtn}</button>
          <button style={{ display: dplay }} onClick={resetFormToDefault} type="button" className="btn btn-info mx-3">Discard</button>
        </form>
      </div>
  )
}
// name, value, onChange is mendetory in controlled form , in uncontrolled form we need useref hook 
// htmlFor , id, name should be same 
export default AddNotes;