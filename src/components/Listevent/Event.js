import React, { useState } from "react";
import "./Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Event = () => {
  const [isCommenting, setIsCommenting] = useState(false); // State để kiểm soát việc hiển thị ô nhập

  const posts = [
    {
      id: 1,
      title: "Bài đăng 1",
      content: "Nội dung của bài đăng 1...",
      timestart: "01/04/2024",
      timesend: "01/04/2024",
    },

    {
      id: 1,
      content: "Nội dung của bài đăng 1...",
      timestart: "01/04/2024",
      timesend: "01/04/2024",
    },

    {
      id: 1,
      content: "Nội dung của bài đăng 1...",
      timestart: "01/04/2024",
      timesend: "01/04/2024",
    },

    {
      id: 1,
      content: "Nội dung của bài đăng 1...",
      timestart: "01/04/2024",
      timesend: "01/04/2024",
    },

    {
      id: 1,
      content: "Nội dung của bài đăng 1...",
      timestart: "01/04/2024",
      timesend: "01/04/2024",
    },
  ];

  return (
    <div className="blog">
      <div className="content">
        <div className="post-container">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-content">
                <h2>Title: {post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="post-time">
                <span className="time-start">Time Start: {post.timestart}</span>
                <span className="time-end">Time End: {post.timesend}</span>
              </div>
              <hr />
              <div style={{ textAlign: "center" }}>
                <Link to="/ViewPost">
                  <button className="btnViewPost">View</button>
                </Link>
                {/* <button className="btnAddContributions">
                  Add Contributions
                </button> */}
                <div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
