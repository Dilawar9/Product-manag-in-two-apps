import React, { useState } from 'react'

function Comment() {
  const [comment, setComment] = useState("");
  const [postid, setPostid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log(comment,postid);

    if (comment !== "" && postid !== "" ) {
      // create comment
      setLoading(true);
      axios.post("http://localhost:4001/Comment/create", {
        comment: comment,
        postid: postid,

      },)

        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            successMsg();
            setTimeout(() => {
              navegate("/dashboard")
            }, 2000)
            setComment("");
            setPostid("");
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
        <div>Comment Created</div>
        <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="mb-3">
          <label id="comment">Comments:</label>
          <input
            type="text"
            id="comment"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="form-control"
            value={comment}
            placeholder="Comment"
          />
        </div>
        <div className="mb-3">
          <label id="postid">Post ID :</label>
          <input
            type="text"
            id="postid"
            onChange={(e) => {
              setPostid(e.target.value);
            }}
            className="form-control"
            value={postid}
            placeholder="postid"
          />
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
            {loading === false ? "Create Comment" : "Loading..."}
          </span>
        </button>
      </form>
    </>

    
  )
}

export default Comment;