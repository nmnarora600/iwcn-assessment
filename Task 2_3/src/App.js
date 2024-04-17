
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './components/Home';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';

import Footer from './components/Footer';
import PostTask from './components/PostTask';

export default function App() {
const [alert, setAlert]=useState(null);
const showAlert=(message, type)=>{
setAlert({msg:message
  ,type:type})

  setTimeout(()=>{
    setAlert(null)
  },1500);
}

  return (
    <div>
      <NoteState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className=' d-flex justify-content-end flex-column'>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
          <Route path="/task3" element={<PostTask showAlert={showAlert}/>}/>

        </Routes>
        </div>
       
        <Footer />
        </div>
       
      </Router>
    
      </NoteState>
    </div>
  )
}


