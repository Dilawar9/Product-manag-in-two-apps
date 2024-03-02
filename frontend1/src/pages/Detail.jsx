import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import createDOMPurify from 'dompurify'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";




function Detail() {
  const [post, setPost] = useState([]);

  const [comment, setComment] = useState("");

  const params = useParams();
  const DOMPurify = createDOMPurify(window)
  // console.log(params.id);

  const navegate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4001/Post/getsingle/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          setPost(res.data.post);
        }
      });
  }, []);

  const successMsg = () =>
    toast.success("Comment are Created ", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });

  if (post === null) {
    return (
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }



  const create = () => {
    axios.post("http://localhost:4001/Comment/create", {
      comment: comment,
      postid: params.id
    })
      .then((res) => {


        if (res.data.status == "success") {
          successMsg();
          setTimeout(() => {
            navegate("/")
          }, 2000)
        } else {
          alert(res.data.message)
        }
      }).catch((error) => {
        alert(error.message);
      })
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
              <div className="mb-3">
                <label htmlFor="comment" className="mb-3">Comment</label><br />
                <input type="text" value={comment} id="" onChange={(e) => { setComment(e.target.value) }} />
                <div className="my-4">
                  <button onClick={create}>Create Comment</button>
                </div>
              </div>

              <div>
                <Link to="/">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
