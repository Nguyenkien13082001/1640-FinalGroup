import React, { useState } from "react";
import "./ViewEvent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Post from "../Listpost/Post";

export default function ViewEvent() {
  const [isCommenting, setIsCommenting] = useState(false); // State để kiểm soát việc hiển thị ô nhập

  const toggleCommentBox = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentSubmit = (event) => {
    // Xử lý khi người dùng nhấn enter hoặc nút gửi
    event.preventDefault();
    // Thực hiện các hành động liên quan đến việc gửi bình luận
    // Ví dụ: gửi dữ liệu lên server
    // Sau đó có thể làm mới trạng thái của ô nhập bằng cách setIsCommenting(false);
  };
  const posts = [
    {
      id: 1,
      title: "Bài đăng 1",
      content: "Nội dung của bài đăng 1...",
      author: "Người đăng 1",
      timestamp: "01/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    {
      id: 2,
      title: "Bài đăng 2",
      content: "Nội dung của bài đăng 2...",
      author: "Người đăng 2",
      timestamp: "02/04/2024",
    },
    // Thêm các bài đăng khác tương tự ở đây
  ];
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "75px" }}>Tên Event</h1>{" "}
      {/* Thêm tiêu đề của event */}
      <div className="post-add" style={{ textAlign: "center" }}>
        <Post></Post>
      </div>
      <div className="blog">
        <div className="content">
          <div className="post-container">
            {posts.map((post) => (
              <div className="post" key={post.id}>
                <div className="post-header">
                  <h2>Title: {post.title}</h2>
                  <span>Đăng bởi: {post.author}</span>
                </div>
                <p>{post.content}</p>
                <span>Time: {post.timestamp}</span>
                <hr />
                <div className="post-interaction">
                  <button>
                    <span className="icon">👍</span> Like
                  </button>
                  <button onClick={toggleCommentBox}>
                    <span className="icon">💬</span> Comment
                  </button>
                </div>
                <hr />
                {isCommenting && (
                  <form onSubmit={handleCommentSubmit}>
                    <textarea
                      className="comment-input"
                      placeholder="Write a comment..."
                    ></textarea>
                    <button type="submit" className="comment-button">
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                  </form>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
