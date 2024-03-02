import { useState } from 'react'
import './App.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Home from './pages/Home'
import Navbar from './pages/Navbar';
import Detail from './pages/Detail';
import { Routes,Route } from 'react-router-dom';

function App() {


  return (
    <>
    <div className='container'>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path="/detail/:id" element={<Detail/>}/>
    </Routes>
    <ToastContainer />
    </div>
      
    </>
  )
}

export default App;
