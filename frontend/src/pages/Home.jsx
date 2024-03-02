import React from 'react'
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";


import 'primeicons/primeicons.css';
import "/node_modules/primeflex/primeflex.css";
import "primeflex/themes/primeone-light.css";



function Home() {
    return (
        <>
            <div className="grid text-lg mt-3 ">
                <div className="border-2  border-round col-2 ">
                    <div>
                        <NavLink className="no-underline" to="/dashboard">Dashboard</NavLink>
                    </div>
                    <ul className="list-none text-left">
                        <NavLink className="no-underline m-3" to="/post"><li>Post</li></NavLink>
                        {/* <NavLink className="no-underline m-3" to="/category"><li>Category</li></NavLink> */}
                        <NavLink className="no-underline m-3" to="/comment"><li>Comments</li></NavLink>
                        <NavLink className="no-underline m-3" to="/category"><li>Category</li></NavLink>
                    </ul>
                    <div>
                        <NavLink className="no-underline" to="/">Logout</NavLink>

                    </div>
                </div>
                <div className="border-2 border-round col-10 ">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Home;