import { useState } from 'react'
import './App.css'
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import  Home from './pages/Home'
import Navbar from './pages/Navbar';

function App() {


  return (
    <>
    <div className='container p-4 m-3'>
    <Navbar/>
    <Home/>

    </div>
      
    </>
  )
}

export default App
