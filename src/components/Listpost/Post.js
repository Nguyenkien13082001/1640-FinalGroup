import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
import apiClient from "../../api/apiClient";

export default function Post({ getPosts }) {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  // const [file, setDoc] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  // const [caption, setCaption] = useState("");
  // const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const getCurrentUrlLastSegment = () => {
    const currentUrl = window.location.href;
    const urlSegments = currentUrl.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    return lastSegment;
  };

  const event_id = getCurrentUrlLastSegment();

  const handleImageFileChange = (event) => {
    setImages([...event.target.files]);
  };

  const handleDocFileChange = (event) => {
    setDocuments([...event.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (images.length !== 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }
    if (documents.length !== 0) {
      documents.forEach((document) => {
        formData.append("documents", document);
      });
    }

    formData.append("is_anonymous", isAnonymous.toString());
    formData.append("event", event_id);

    try {
      const response = await apiClient({
        method: "post",
        url: "https://comp1640.pythonanywhere.com/add_post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.message);
      getPosts();
      handleClose();
    } catch (error) {
      toast.error("Error adding post: " + error.response.data.message);
    }
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const resetForm = () => {
    // setCaption("");
    // setDescription("");
    setImages(null);
    setDocuments(null);
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
            {/* <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="caption"
                placeholder="Enter Title"
                value={caption}
                onChange={handleInputChange}
              />
            </Form.Group> */}

            {/* <Form.Group controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea" // Thay đổi thành textarea
                rows={2} // Số hàng cho phép hiển thị
                name="description"
                placeholder="Enter Content"
                value={description}
                onChange={handleInputChange}
              />
            </Form.Group> */}

            <Form.Group controlId="formGridFile">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageFileChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridContent">
              <Form.Label>Upload Document</Form.Label>
              <Form.Control
                type="file"
                accept=".doc, .docx"
                multiple
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
                label={
                  <span
                    onClick={toggleModal}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                  >
                    I agree to the terms and conditions
                  </span>
                }
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Modal show={showModal} onHide={toggleModal}>
              <Modal.Header closeButton>
                <Modal.Title>Terms and Conditions</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <b>
                  Welcome to GreenWich University's online blog. This blog is a
                  platform that allows students to share articles, opinions and
                  information related to school events. By using this blog, you
                  agree to comply with the following terms and conditions:
                </b>
                <br />
                <br />
                <p>
                  <b>1: Scope of Contribution :</b> You may post articles,
                  comments and images related to school-organized events or
                  student-related activities. All posted content must be
                  appropriate and respect copyright and privacy regulations and
                  not violate current laws.
                  <br />
                  <b>2: Content Policy :</b> Avoid posting posts or comments
                  that are offensive, discriminatory, insulting, or may harm
                  others. The University reserves the right to remove any
                  content determined to be inappropriate without prior notice.
                  <br />
                  <b>3: Personal Responsibility :</b> You are solely responsible
                  for the content you post. The University is not responsible
                  for any claims arising from content provided by you.
                  <br />
                  <b>4: Security and Privacy : </b>
                  Respect the privacy of others. Do not post other people's
                  personal information without their consent.
                  <br />
                  <b>5: Changes to Terms and Conditions : </b>
                  The University reserves the right to amend these terms and
                  conditions at any time. Changes will be announced on the blog
                  and will take effect immediately after being posted.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
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
