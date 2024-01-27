import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import createDOMPurify from 'dompurify'


 

function Detail() {
  const [post, setPost] = useState([]);
  const[category,setCategory]=useState("");

  const params = useParams();
  const DOMPurify = createDOMPurify(window)
  // console.log(params.id);

  useEffect(() => {
    axios
      .get(`http://localhost:4001/Post/getsingle/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data.post);
        }
      });
  }, []);

  if (post === null) {
    return (
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
  console.log(post);


  const create=()=>{

  }


  return (
    <>
      {/* {post !== null ? (
        <div>Post Title:{post.title}</div>
      ) : (
        <p className="alert alert-danger">No Post Found</p>
      )} */}
      <div className="card mb-3 m-4">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`http://localhost:4001/${post.image}`} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Post Exerpt:{post.exerpt}</h5>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.body) }} />
              <p className="card-text"><small className="text-body-secondary">Post  Catogory:{post.category}</small></p>
              <p className="card-text"><small className="text-body-secondary">Post  Status:{post.status}</small></p>
              <div>
                <label htmlFor="comment">Comment</label>
                <input type="text" value={category} id="" onChange={(e)=>{setCategory(e.target.value)}} />
                <div>
                  <button onClick={create}>Create Comment</button>
                </div>
              </div>
              <Link to="/">Go to Home</Link>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
