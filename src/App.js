import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

function App() {

  return (
    <>
      <NoteState>
        <Router>
          <div className="sticky-top">
            <Navbar />
          <Alert message={"i am alert component"} />
          </div>
          <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route exact path={'/about'} element={<About />} />
            <Route exact path={'/login'} element={<LogIn />} />
            <Route exact path={'/signup'} element={<SignUp/>} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
