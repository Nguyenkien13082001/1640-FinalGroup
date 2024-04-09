import React, { useState, useEffect } from "react";
import "./ViewEvent.css";
import apiClient from "../../api/apiClient"; // Import thư viện gọi API
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Post from "../Listpost/Post";
import { flushSync } from "react-dom";
import LayoutHome from "../../layouts/LayoutHome";
import { TiTickOutline } from "react-icons/ti";

const ViewEvent = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // State để lưu trữ danh sách comment

  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = async (postId) => {
    try {
      // Thực hiện gửi bình luận lên server (sử dụng API, axios, fetch, ...)
      // Ví dụ:
      const response = await apiClient.post(
        "https://comp1640.pythonanywhere.com/add_comment",
        {
          // ID của người dùng, bạn có thể thay đổi tùy vào cách bạn xác định người dùng hiện tại
          post: postId, // ID của bài viết
          comment: commentText[postId], // Nội dung bình luận
        }
      );

      // Xử lý kết quả trả về từ server (nếu cần)
      // Ví dụ: cập nhật lại danh sách bình luận sau khi gửi thành công
      console.log("Comment submitted successfully:", response);

      // Reset ô nhập bình luận sau khi gửi thành công

      if (response.message) {
        const updateComments = response.comments; // Số lượng like mới từ API
        const update_comment_list = response.comment_list;
        // Cập nhật trạng thái của nút like và số lượng like trong danh sách posts
        const updatedPosts = {
          ...posts,
          posts: posts.posts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  comments: updateComments,
                  comments_list: update_comment_list,
                }
              : post
          ),
        };
        setPosts(updatedPosts);
        setCommentText({ ...commentText, [postId]: "" });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Xử lý lỗi khi gửi bình luận (nếu cần)
    }
  };

  const handleCommentInputChange = (event, postId) => {
    const { value } = event.target;
    setCommentText({ ...commentText, [postId]: value });
  };

  const [formData, setFormData] = useState({
    post: "",
  });

  useEffect(() => {
    getPosts();
  }, []);

  const getCurrentUrlLastSegment = () => {
    // Lấy URL hiện tại
    const currentUrl = window.location.href;

    // Phân tách URL thành các phần bằng dấu "/"
    const urlSegments = currentUrl.split("/");

    // Lấy phần tử cuối cùng của mảng (segment cuối cùng của URL)
    const lastSegment = urlSegments[urlSegments.length - 1];

    return lastSegment;
  };

  const getPosts = async () => {
    try {
      const event_id = getCurrentUrlLastSegment();
      const response = await apiClient.get(
        "https://comp1640.pythonanywhere.com/posts/event/" + event_id
      ); // Gọi API từ endpoint "/posts/event" với tham số truy vấn 'param'
      console.log("abc", response);
      setPosts(response); // Cập nhật state posts với dữ liệu nhận được từ API
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const [isCommenting, setIsCommenting] = useState(false); // State để kiểm soát việc hiển thị ô nhập
  const [likes, setLikes] = useState({});

  const toggleCommentBox = () => {
    setIsCommenting(!isCommenting);
  };

  const handleLikeClick = async (postId, is_like) => {
    try {
      let response = {};
      let like = is_like;
      if (is_like === false) {
        response = await apiClient.post(
          "https://comp1640.pythonanywhere.com/add_like",
          {
            post: postId,
          }
        );
        like = true;
      } else {
        response = await apiClient.post(
          "https://comp1640.pythonanywhere.com/remove_like",
          {
            post: postId,
          }
        );
        like = false;
      }
      console.log("jijijijij>>>", response.message);
      if (response.message) {
        const updatedLikes = response.likes; // Số lượng like mới từ API

        // Cập nhật trạng thái của nút like và số lượng like trong danh sách posts
        const updatedPosts = {
          ...posts,
          posts: posts.posts.map((post) =>
            post._id === postId
              ? { ...post, is_liked: like, likes: updatedLikes }
              : post
          ),
        };
        setPosts(updatedPosts);
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const renderComments = (commentsList) => {
    // hàm này để gọi comment và sinh ra các elements chứa comments
    return commentsList.map((comment) => (
      <div key={comment._id} className="comment">
        <b className="comment-author">{comment.user.name} :</b>
        <p className="comment-text">{comment.comment}</p>
        <p className="comment-time"> {comment.created_at}</p>
      </div>
    ));
  };

  return (
    <LayoutHome>
      {" "}
      <div>
        {posts && (
          <h1 style={{ textAlign: "center", marginTop: "75px" }}>
            {posts.event_name}
          </h1>
        )}

        <div className="post-add" style={{ textAlign: "center" }}>
          <Post getPosts={getPosts} />
        </div>
        <div className="blog">
          <div className="content">
            <div className="post-container">
              {posts &&
                posts.posts &&
                posts.posts.map((post) => (
                  <div className="post" key={post.id}>
                    <div className="post-header">
                      <h2>
                        Author:
                        {post.is_anonymous ? "Anonymous" : post.user.name}{" "}
                        <TiTickOutline
                          style={{ color: "blue", fontSize: "30px" }}
                        />
                      </h2>

                      <h6>Title: {post.caption}</h6>
                    </div>
                    <p>{post.content}</p>
                    <span>Time: {post.created_at}</span>
                    <hr />
                    <div>
                      <p>{post.description}</p>
                    </div>

                    <div>
                      {post.file !== "null" && (
                        <a href={post.file}>
                          {post.file.substring(post.file.lastIndexOf("/") + 1)}
                        </a>
                      )}
                    </div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {post.image !== "null" && ( // Kiểm tra nếu có ảnh
                        <img
                          style={{ width: "300px", height: "400px" }}
                          src={post.image}
                          alt=""
                        />
                      )}
                    </div>
                    <hr />

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {" "}
                      <div className="like-count">{post.likes} Like</div>
                      <div className="like-count">{post.comments} Comment</div>
                    </div>

                    <hr />
                    <div className="post-interaction">
                      {/* <button onClick={handleLikeClick}>
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                  </button> */}

                      {/* <button
                    onClick={() => handleLikeClick(post._id, post.is_liked)}
                    style={{ color: post.is_liked ? "blue" : "black" }}
                  >
                    <FontAwesomeIcon icon={faThumbsUp} /> Like
                  </button> */}

                      <button
                        onClick={() => handleLikeClick(post._id, post.is_liked)}
                        style={{ color: post.is_liked ? "blue" : "black" }}
                      >
                        <FontAwesomeIcon icon={faThumbsUp} /> Like
                      </button>
                      <button onClick={toggleCommentBox}>
                        <FontAwesomeIcon icon={faComment} /> Comment
                      </button>
                    </div>
                    {isCommenting && (
                      <form style={{ marginTop: "10px" }} className="cmt">
                        <textarea
                          value={commentText[post._id] || ""}
                          onChange={(event) =>
                            handleCommentInputChange(event, post._id)
                          }
                          className="comment-input"
                          placeholder="Write a comment..."
                        ></textarea>
                        <button
                          type="button"
                          className="comment-button"
                          onClick={() => handleCommentSubmit(post._id)}
                        >
                          <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                      </form>
                    )}
                    <hr />
                    <div className="post-content">
                      {post.comments_list.length > 0 && (
                        <div className="comments-container">
                          {renderComments(post.comments_list)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default ViewEvent;
