import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient"; // Import thư viện gọi API
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { TiTickOutline } from "react-icons/ti";

const Doc = () => {
  const [posts, setPosts] = useState([]);
  const [commentTexts, setCommentTexts] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingComment, setEditingComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

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

  const handleEditComment = (commentId) => {
    setIsEditing(true);
    setEditingCommentId(commentId);
  };

  const handleEditCommentInputChange = (event, postId) => {
    const { value } = event.target;
    setEditingComment(value);
  };

  const handleCancelEditComment = () => {
    setEditingComment("");
    setEditingCommentId("");
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      // Gửi yêu cầu xóa bình luận lên server (sử dụng API, axios, fetch, ...)
      // Ví dụ:
      const response = await apiClient.delete(
        `https://comp1640.pythonanywhere.com/delete_comment/${commentId}`
      );

      // Xử lý kết quả trả về từ server (nếu cần)
      // Ví dụ: cập nhật lại danh sách bình luận sau khi xóa thành công
      console.log("Comment deleted successfully:", response);

      if (response.message) {
        const updateComments = response.comments; // Số lượng bình luận mới từ API
        const update_comment_list = response.comment_list;
        // Cập nhật trạng thái của bài viết sau khi xóa bình luận thành công
        const updatedPosts = posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: updateComments,
                comments_list: update_comment_list,
              }
            : post
        );
        setPosts(updatedPosts);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Xử lý lỗi khi xóa bình luận (nếu cần)
    }
  };

  const handleSaveEditComment = async (postId, commentId) => {
    try {
      const response = await apiClient.put(
        `https://comp1640.pythonanywhere.com/update_comment/${commentId}`,
        {
          comment: editingComment,
        }
      );

      console.log("Comment edited successfully:", response);

      if (response.message) {
        // Cập nhật trạng thái của bình luận sau khi chỉnh sửa thành công
        const updatedPosts = posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments_list: post.comments_list.map((comment) =>
                  comment._id === editingCommentId
                    ? { ...comment, comment: editingComment }
                    : comment
                ),
              }
            : post
        );
        setPosts(updatedPosts);
        // console.log("xnxx>S>>>", updatedPosts);
        setPosts(updatedPosts);
        setEditingComment("");
        setEditingCommentId("");

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const renderComments = (postId, commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment._id} className="comment">
        <b className="comment-author">{comment.user.name} :</b>
        {editingCommentId === comment._id ? (
          <div style={{ marginBottom: "15px" }}>
            <textarea
              onChange={(event) => handleEditCommentInputChange(event, postId)}
              type="text"
              value={editingComment ? editingComment : comment.comment}
              className="comment-input1"
              placeholder="Edit your comment..."
              disabled={!isEditing}
            ></textarea>

            <div className="comment-actions">
              <button
                onClick={() => handleSaveEditComment(postId, comment._id)}
              >
                Save
              </button>
              <button onClick={handleCancelEditComment}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <p className="comment-text">{comment.comment}</p>
            <p className="comment-time">{comment.created_at}</p>
            {comment.user._id === localStorage.getItem("user_id") && (
              <div className="comment-actions">
                <button onClick={() => handleEditComment(comment._id)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComment(postId, comment._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
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
                      <img
                        style={{
                          width: "25px",
                          height: "25px",
                          marginRight: "10px",
                          marginBottom: "5px",
                        }}
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      {post.is_anonymous ? "Anonymous" : post.user.name}{" "}
                      <TiTickOutline
                        style={{ color: "blue", fontSize: "30px" }}
                      />
                    </h2>

                    <h6>Title: {post.caption}</h6>
                  </div>
                  <p>{post.content}</p>
                  <span>
                    <img
                      style={{
                        width: "25px",
                        height: "25px",
                        marginRight: "10px",
                        marginBottom: "5px",
                      }}
                      src="data:image/png;base64,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"
                      alt=""
                    />{" "}
                    {post.created_at}
                  </span>
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
                        {renderComments(post._id, post.comments_list)}
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
