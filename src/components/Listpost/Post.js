import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
import apiClient from "../../api/apiClient";

export default function Post({ getPosts }) {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setDoc] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const getCurrentUrlLastSegment = () => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment;
  };

  const event_id = getCurrentUrlLastSegment();

  const handleImageFileChange = (file) => {
    const selectedImageFile = file.target.files[0];
    console.log(selectedImageFile);
    setImage(selectedImageFile);
  };

  const handleDocFileChange = (file) => {
    const selectedDocFile = file.target.files[0];
    setDoc(selectedDocFile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "caption") {
      setCaption(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("description", description);
      formData.append("event", event_id);
      formData.append("image", image);
      formData.append("file", file);
      formData.append("is_anonymous", isAnonymous.toString());
      console.log("form nè >", formData);
      await apiClient({
        method: "post",
        url: "https://comp1640.pythonanywhere.com/add_post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Add Post Success");
      getPosts();
      handleClose();
    } catch (error) {
      console.log("Lỗi rồi", error.message);
    }

    handleClose();
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleToggleAnonymous = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleClose = () => {
    resetForm(); // Reset form khi đóng modal

    setShow(false);
  };

  const resetForm = () => {
    setCaption("");
    setDescription("");
    setImage(null);
    setDoc(null);
    setIsChecked(false);
    setIsAnonymous(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{ width: "120px" }} variant="primary" onClick={handleShow}>
        Add Post
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Idea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="caption"
                placeholder="Enter Title"
                value={caption}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea" // Thay đổi thành textarea
                rows={2} // Số hàng cho phép hiển thị
                name="description"
                placeholder="Enter Content"
                value={description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formGridFile">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridContent">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                accept=".doc, .docx"
                onChange={handleDocFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Post anonymously"
                checked={isAnonymous}
                onChange={handleToggleAnonymous}
              />
            </Form.Group>
            <Form.Group controlId="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree to the terms and conditions"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ width: "150px" }}
            variant="primary"
            onClick={handleUpload}
            disabled={!isChecked}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
