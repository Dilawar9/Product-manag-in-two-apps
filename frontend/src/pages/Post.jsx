import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";

function Post() {
  const [title, setTitle] = useState("");
  const [exerpt, setExerpt] = useState("");
  const[category,setCategory]=useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");
  // const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cat,setCat]=useState([]);
  useEffect(() => {
    axios.get("http://localhost:400/post/getall").then((res) => {
      setCat(res.data);
    })
  }, [])
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
      theme: "dark"
    });

  const handleSubmit = () => {
    console.log(title, body,  image, status);

    if (title !== "" && exerpt !== "" && category!=="" && body !== "" &&  image !== "null" && status !== "") {
      // create post
      setLoading(true);
      axios.post("http://localhost:4001/Post/create", {
        title: title,
        exerpt: exerpt,
        category:category,
        body: body,
        status: status,
        image: image
        

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
            setExerpt("");
            setCategory("");
            setBody("");
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
        <div className="flex justify-content-around">
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

          <div className="flex justify-content-around">
            <div className="mb-3">
              <label id="exerpt">Exerpt:</label>
              <input
                type="text"
                id="exerpt"
                onChange={(e) => {
                  setExerpt(e.target.value);
                }}
                className="form-control"
                value={exerpt}
                placeholder="Post exerpt"
              />
            </div>
          </div>
          <div className="flex justify-content-around">
            <div className="mb-3">
              <label id="category">Category:</label>
              <input
                type="text"
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="form-control"
                value={cat}
                placeholder="Post category"
              />
                   {
                  cat.map((cat) => {
                    return <option value={cat.name}>{cat.name}</option>
                  })
                }
            </div>
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


        </div>


        <div className="card p-0">
          <Editor value={body} onTextChange={(e) => setBody(e.htmlValue)} style={{ height: '320px' }} />
        </div>

        <button
          className="btn btn-warning p-2 m-2 round"
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