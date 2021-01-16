import React, { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Config
import { url } from "../../config.js";

// User context
import { useUserContext } from "../../Context/userContext";

// Components
import Comment from "../Comment/comment.js";

// Styling
import style from "./comments.module.css";
import cn from "classnames";

export default function Comments({ eventid }) {
  /*--------User context--------*/
  const [user] = useUserContext();

  const [allComments, setAllComments] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [comment, setComment] = useState([]);

  const [newCommentId, setNewCommentId] = useState(null);

  // Fetching all comments
  async function getAllComments() {
    const res = await fetch(`${url}/comments`);
    const data = await res.json();
    setAllComments(data.payload);
    console.log(data.payload);
  }

  useEffect(() => {
    getAllComments();
  }, []);

  // Formating dateTime
  const dateTime = new Date();
  let commentDateTime = new Date(dateTime);
  let displayDate = commentDateTime.toLocaleDateString();
  let displayTime = commentDateTime.toLocaleTimeString();

  // Post Comment
  // PATCH/POST Event
  let createComment = async (msg) => {
    await fetch(`http://localhost:3000/comments`, {
      method: "POST",
      body: JSON.stringify({
        commentUserId: user.id,
        name: user.name,
        surname: user.surname,
        timeDate: dateTime,
        commentEventId: eventid,
        profileImage: user.profileImage,
        cohort: user.cohort,
        comment: msg,
        likes: [],
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((date) => setNewCommentId(date?.commentid))
      .catch((error) => console.log("comment creation error: ", error));
  };

  // Add comment function
  function addComment() {
    if (inputValue === "") {
      return;
    }
    const newComment = [
      ...comment,
      {
        commentuserid: user.id,
        name: user.name,
        surname: user.surname,
        timedate: dateTime,
        profileimage: user.profileImage,
        cohort: user.cohort,
        comment: inputValue,
        likes: [],
      },
    ];
    setComment(newComment);
    createComment(inputValue);
    console.log("this is comment: ", comment);
    setInputValue("");
  }

  return (
    <div>
      {allComments &&
        allComments.map((comment, index) => {
          return comment.commenteventid === eventid ? (
            <Comment
              key={index}
              comments={comment}
              newCommentId={newCommentId}
            />
          ) : null;
        })}

      {comment.map((comment, index) => {
        return (
          <Comment key={index} comments={comment} newCommentId={newCommentId} />
        );
      })}

      <div>
        <input
          type="text"
          className={style.commentInput}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <div className={style.buttonAligner}>
          <button onClick={addComment} className="button">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
