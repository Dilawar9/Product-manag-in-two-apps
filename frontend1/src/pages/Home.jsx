import React from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'


function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {


        axios.get("http://localhost:4001/Post/getall").then((res) => {
            console.log(res.data.post)

            setPosts(res.data.post);
        
            // console.log(res.data.post);

        })
    }, []);

    const header = (
        <img alt={posts.image} src={`http://localhost:4001/${posts.image}`} />
    );

    return (
        <>
            <div className="hompage">
                <h1>All Posts</h1>

                <div className="container mt-4">
                    <div>

                        {posts.map((element, index) => {
                     

                            return (

                                <div className="mb-3" key={index}>
                                    <div className="card grid flex-row ">
                                        <div className='col-4'>
                                            <img className=""
                                                src={`http://localhost:4001/${element.image}`}
                                                alt="..."
                                            />
                                        </div>
                                        <div className="card-body col-8">
                                            <h5 className="card-title"> Title:{element.title}</h5>
                                            <h6>Exerpt: {element.exerpt}</h6>
                                            <h6>Category: {element.category}</h6>

                                            <Link to={`/detail/${element._id}`}>more</Link>
                                        </div>
                                    </div>
                                </div>
                            );
                           
                        })}
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;