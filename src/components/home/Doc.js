import React, { useState, useEffect } from "react";

import apiClient from "../../api/apiClient"; // Import thư viện gọi API
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Post from "../Listpost/Post";
import { TiTickOutline } from "react-icons/ti";

const Doc = () => {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await apiClient.post(
        "https://comp1640.pythonanywhere.com/add_comment",
        {
          post: postId,
          comment: commentTexts[postId],
        }
      );

      console.log("Comment submitted successfully:", response);

      // setCommentTexts("");

      if (response.message) {
        const updatedPosts = posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: response.comments,
                comments_list: response.comment_list,
              }
            : post
        );
        setPosts(updatedPosts);
        setCommentTexts({ ...commentTexts, [postId]: "" });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleCommentInputChange = (event, postId) => {
    const { value } = event.target;
    setCommentTexts({ ...commentTexts, [postId]: value });
  };
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await apiClient.get(
        "https://comp1640.pythonanywhere.com/get_posts" // API endpoint để lấy tất cả các bài đăng
      );
      console.log("homec", response);
      setPosts(response); // Cập nhật state posts với dữ liệu nhận được từ API
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const [isCommenting, setIsCommenting] = useState(false);

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
        const updatedPosts = posts.map((post) =>
          post._id === postId
            ? { ...post, is_liked: like, likes: response.likes }
            : post
        );
        setPosts(updatedPosts);
      } else {
        console.error("Failed to update like status");
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment._id} className="comment">
        <b className="comment-author">{comment.user.name} :</b>
        <p className="comment-text">{comment.comment}</p>
        <p className="comment-time"> {comment.created_at}</p>
      </div>
    ));
  };

  return (
    <div>
      {/* {posts && (
        <h1 style={{ textAlign: "center", marginTop: "75px" }}>
          {posts.event_name}
        </h1>
      )}

      <div className="post-add" style={{ textAlign: "center" }}>
        <Post getPosts={getPosts} />
      </div> */}
      <div className="blog">
        <div className="content">
          <div className="post-container">
            {posts &&
              posts.map((post) => (
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
                    {post.image !== "null" && (
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
                        value={commentTexts[post._id] || ""}
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
  );
};

export default Doc;
