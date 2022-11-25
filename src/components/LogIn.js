import React from 'react'
import { useRef, useContext, useEffect  } from 'react';
import { useNavigate,Link, useLocation } from "react-router-dom";
import noteContext from '../context/notes/NoteContext'
const LogIn = () => {
    const Context = useContext(noteContext);
    let { showAlert, setLdplay } = Context
    const lemail = useRef();
    const lpass = useRef();
    const navigate = useNavigate()
    useEffect(() => {
        lemail.current.value = ''
        lpass.current.value = ''
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "email": lemail.current.value,
            "password": lpass.current.value
        }
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        alert('into login')
        const res = await response.json() // parses JSON response into native JavaScript objects
        if (res.success === true) {
            sessionStorage.setItem('token', res.token)
            navigate('/')
            setLdplay('inline')
            showAlert('you have been logged in successfully', 'success')
        } else {
            showAlert('there is some Error occoured!', 'danger')
        }

    }

    return (
        <> <div className="container">
            <h2 className='my-3 text-center'>Login To Continue...</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" ref={lemail} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' ref={lpass} />
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="container d-flex justify-content-center"><Link className="text-center my-4 mx-auto" style={{marginTop: '10px'}} to="/signup"> Sign up for blacknote</Link></div>
        </div>
        </>
    )
}

export default LogIn


// localhost:5000/api/auth/login
