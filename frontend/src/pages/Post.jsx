import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Post() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [status,setStatus]=useState("");
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navegate = useNavigate();

  const successMsg = () =>
    toast.success("post created successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });

  const handleSubmit = () => {
    console.log(title, body, category, image,status);

    if (title !== "" && body !== "" && category !== "" && image !== "null" && status!=="") {
      // create post
      setLoading(true);
      axios.post("http://localhost:4001/Post/create", {
        title: title,
        body: body,
        category: category,
        image: image,
        status:status

      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            successMsg();
            setTimeout(() => {
              navegate("/dashboard")
            }, 2000)
            setTitle("");
            setBody("");
            setCategory("");
            setImage(null);
            setStatus("");
          }
        })
        .catch((er) => {
          console.log(er.message);
        })
        .finally(() => setLoading(false));
    } else {
      alert("Please Enter Data");
    }
  };

  return (
    <>
     <h2>Create Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-3">
          <label id="title">Post Title:</label>
          <input
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            value={title}
            placeholder="Post title"
          />
        </div>
        <div className="mb-3">
          <label id="body">Body:</label>
          <input
            type="text"
            id="body"
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="form-control"
            value={body}
            placeholder="body"
          />
        </div>
        <div className="mb-3">
          <label id="category">Category:</label>
          <select onChange={(e) => {
            setCategory(e.target.value);
          }} className="form-control" value={category} id="category">
            <option value="mobile">Mobile</option>
            <option value="computer">Computer</option>
          </select>
        </div>

        <div className="mb-3">
          <label id="image" className="text-start d-block font-bold">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="form-control"
          />
          {/* {(errors.image) ? <div className="alert alert-danger py-1 mt-1"> {errors.image}</div> : null} */}
        </div>
        <div className="mb-3">
          <label id="status">Stautus:</label>
          <select onChange={(e) => {
            setStatus(e.target.value);
          }} className="form-control" value={status} id="status">
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>


        <button
          className="btn btn-warning"
          type="button"
          onClick={handleSubmit}
          disabled={loading === true ? true : ""}
        >
          {loading === true ? (
            <span
              className="spinner-grow spinner-grow-sm me-1"
              aria-hidden="true"
            ></span>
          ) : null}

          <span role="status">
            {loading === false ? "Create Product" : "Loading..."}
          </span>
        </button>
      </form>
    </>
  )
}

export default Post;