import React, { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// User context
import { useUserContext } from "../../Context/userContext";

// Components
import Comment from "../Comment/comment.js";

export default function Comments({ eventid }) {
  /*--------User context--------*/
  const [user] = useUserContext();

  const [allComments, setAllComments] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [comment, setComment] = useState([]);

  // Fetching all comments
  async function getAllComments() {
    const res = await fetch("http://localhost:3000/comments");
    const data = await res.json();
    setAllComments(data.payload);
    console.log(data.payload);
  }

  useEffect(() => {
    getAllComments();
  }, []);

  // Add comment function
  function addComment() {
    const newComment = [
      ...comment,
      {
        commentuserid: user.id,
        name: user.name,
        surname: user.surname,
        timedate: "date",
        profileimage: user.profileimage,
        comment: inputValue,
        likes: [],
      },
    ];
    setComment(newComment);
    console.log("this is comment: ", comment);
    setInputValue("");
  }

  return (
    <div>
      {allComments &&
        allComments.map((comment, index) => {
          return comment.commenteventid === eventid ? (
            <Comment key={index} comments={comment} />
          ) : null;
        })}

      {comment.map((comment, index) => {
        return <Comment key={index} comments={comment} />;
      })}

      <div>
        <input
          type="text"
          className="commentInput"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={addComment}>Reply</button>
      </div>
    </div>
  );
}
