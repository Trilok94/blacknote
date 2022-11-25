import React from 'react'
import { useRef, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import noteContext from '../context/notes/NoteContext'
const SignUp = () => {

  const Rname = useRef()
  const Remail = useRef()
  const Rpassword = useRef()
  const navigate = useNavigate()
  const Context = useContext(noteContext);
  let {showAlert} = Context
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      "name": Rname.current.value,
      "email": Remail.current.value,
      "password": Rpassword.current.value
    }
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    const res = await response.json() // parses JSON response into native JavaScript objects
    if (res.success === true) {
      sessionStorage.setItem('token', res.token)
      navigate('/login')
      showAlert('you have been logged in successfully', 'success')
    } else {
      showAlert('there is some Error occoured!', 'danger')
    }

  }


  return (
    <><div className="container">
      <h1 className='my-3 text-center'>Create Account </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="uname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="uname" name='uname' ref={Rname}  />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" ref={Remail} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' ref={Rpassword} />
        </div>

        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      <div className="container d-flex justify-content-center"><Link className="text-center my-4 mx-auto" style={{marginTop: '10px'}} to="/login">Already have an account?</Link></div>
    </div>
    </>
  )
}

export default SignUp


// localhost:5000/api/auth/signup

