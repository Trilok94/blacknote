import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import noteContext from '../context/notes/NoteContext';
const Navbar = () => {
    const Context = useContext(noteContext)
    let { ldplay, setLdplay } = Context
    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])

const handlelogoutbt = () => {
    setLdplay('none')
    sessionStorage.removeItem('token')
}

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Black-Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home"}? "active": "" `} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about"}? "active": "" `} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <Link id='logbt' onClick={handlelogoutbt} style={{display: ldplay}} className="btn btn-outline-light mx-1" to="/login" role="button">LogOut</Link>
                            
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;