
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Post from './pages/Post'
import Comment from './pages/Comment'
import Edit from './pages/Edit'
import { Routes, Route, NavLink, } from "react-router-dom";

import './App.css'

function App() {
  

  return (
    <>
      <NavLink to="/">Home</NavLink>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post/>}/>
          <Route path="/comment" element={<Comment/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
