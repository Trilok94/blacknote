import NoteContext from "./NoteContext";
import { useState, useRef } from "react";
const NoteState = (props) => {
  const obj1 = {
    "name": "obj1",
    "type": "object1"
  }
  const variable = "i am variable"
  const obj2 = {
    "name": "obj2",
    "type": "object2",
    "func_hello": () => {
      alert("hello")
    }
  }
  const func_hello = () => {
    console.log('hello i am func_hello')
  }


  const notesdata = []
  const [notes, setNotes] = useState(notesdata)
  const [alert, setAlert] = useState(null);
  // let active = 'active';
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    // console.log('alert has been runned')
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  };

  const [anehead, setAnehead] = useState('Add a Note below :')
  const [anebtn, setAnebtn] = useState('Add Note')
  const [aneTitle, setAneTitle] = useState("Add your Title")
  const [aneDesc, setAneDesc] = useState('Add your Description')
  const [exponid, setExponid] = useState('')
  const [dplay, setDplay] = useState('none')
  const [titletext, setTitletext] = useState('')
  const [desctext, setDesctext] = useState('')
  const [tagtext, setTagtext] = useState('')
  const [reqNote, setReqNote] = useState({ title: "", description: "", tag: "default" })
  const reftitle = useRef(null)
  const refdesc = useRef(null)
  const reftag = useRef(null)
  const [ldplay, setLdplay] = useState(sessionStorage.getItem('token') ? 'inline' : 'none')









  const host = process.env.REACT_APP_BACK_HOST
  const fetchalldata = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'jwt_auth_token': sessionStorage.getItem('token')
      }

    });
    const jsondata = await response.json()
    console.log(jsondata)
    setNotes(jsondata)
  }








  // you have to update information from clientside and from server side also 
  // Add note 
  const addNote = async (title, description, tag) => {
    const req_data = {
      "title": title,
      "description": description,
      "tag": tag
    }
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'jwt_auth_token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(req_data) // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    // TO DO : Api call
    // setNotes(fetchalldata())
    fetchalldata()
    showAlert('A new note has been added', 'success')
    // concat the new note to available note
    // note : concat return an array where as push update an array 


    // client side change 
    // setNotes(notes.concat(added_note))
  }













  // Delete note 
  const deleteNote = async (id) => {
    //server side change
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'jwt_auth_token': sessionStorage.getItem('token')
      } // body data type must match "Content-Type" header
    });

    // setNotes(fetchalldata())
    fetchalldata()
    showAlert('your note has been deleted', 'success')

    // client side change
    // console.log("this is the current note id : " + id)
    // const newNote = notes.filter((note) => {
    //   return id !== note._id
    // })
    // setNotes(newNote)
  }
















  // Edit note 
  const editNote = async (id, title, description, tag) => {

    // server side change
    const req_data = {
      "title": title,
      "description": description,
      "tag": tag
    }
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'jwt_auth_token': sessionStorage.getItem('token')
      },
      body: JSON.stringify(req_data) // body data type must match "Content-Type" header
    });
    // setNotes(fetchalldata())
    fetchalldata()
    // client side change
    // for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if (element._id === id) {
    //     element.title = title
    //     element.description = description
    //     element.tag = tag
    //   }
    // }
  }

  return (
    // this is jsx , have to use {} for javascript 

    <NoteContext.Provider value={{
      showAlert: showAlert,
      alert: alert,
      notes: notes,
      fetchalldata: fetchalldata,
      setNotes: setNotes,
      obj1: obj1,
      obj2: obj2,
      variable: variable,
      func_hello: func_hello,
      addNote: addNote,
      deleteNote: deleteNote,
      editNote: editNote,
      anehead: anehead,
      anebtn: anebtn,
      setAnehead: setAnehead,
      setAnebtn: setAnebtn,
      aneTitle: aneTitle,
      aneDesc: aneDesc,
      exponid: exponid,
      setExponid: setExponid,
      dplay: dplay,
      setDplay: setDplay,
      titletext: titletext,
      setTitletext: setTitletext,
      desctext: desctext,
      setDesctext: setDesctext,
      tagtext: tagtext,
      setTagtext: setTagtext,
      reqNote: reqNote,
      setReqNote: setReqNote,
      reftitle: reftitle,
      refdesc: refdesc,
      reftag: reftag,
      ldplay: ldplay,
      setLdplay: setLdplay
    }}>
      {/* As Like we pass the props into component  */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;