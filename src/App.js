import React, { useState } from 'react';
// import './App.css';
import About from './Components/About';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NoteState from './context/notes/NoteState';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alert from './Components/Alert';

function App() {
  // eslint-disable-next-line
  const [alert, setAlert] = useState(null)
  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <div className="App">
      <NoteState>
        <Router>

          <Navbar showalert={showalert}/>
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showalert={showalert} />}></Route>
            {/* <Route exact path="/home"  /> */}
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login showalert={showalert} />}></Route>
            <Route path="/signup" element={<Signup showalert={showalert} />}></Route>
          </Routes>
        </Router>
      </NoteState>

    </div>
  );
}

export default App;
