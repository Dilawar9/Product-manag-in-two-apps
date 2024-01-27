import React from 'react'
import { Link } from 'react-router-dom';



function Navbar() {
  
  return (
    <>
      <div className="card grid gap-3 m-3 p-3 ">
      <div><Link to="/" className='no-underline'>Home</Link></div>
      {/* <div><Link to="/detail" className='no-underline'>Detail</Link></div> */}
      </div>
    </>

  )
}

export default Navbar;