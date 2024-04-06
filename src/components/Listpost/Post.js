import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Post() {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null); // State để lưu trữ file được chọn
  const [isChecked, setIsChecked] = useState(false); // State để lưu trạng thái của checkbox

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Lưu file được chọn vào state
  };

  const handleUpload = () => {
    // Xử lý logic tải lên file ở đây
    handleClose(); // Đóng modal sau khi tải lên thành công
  };

  const handleResetFile = () => {
    setFile(null); // Xóa file hiện tại khi người dùng muốn chọn lại
  };

  const isImageFile = (file) => {
    return file && file.type.startsWith("image"); // Kiểm tra xem file có phải là hình ảnh hay không
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Khi người dùng click vào checkbox, cập nhật trạng thái của checkbox
  };

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
              <Form.Control type="text" placeholder="Enter Title" />
            </Form.Group>

            <Form.Group controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              <Form.Control type="text" placeholder="Enter Content" />
            </Form.Group>

            <Form.Group controlId="formGridFile">
              <Form.Label>Document</Form.Label>
              {file && isImageFile(file) ? ( // Kiểm tra nếu file là hình ảnh thì hiển thị ảnh
                <>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded Image"
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                  <Button variant="primary" onClick={handleResetFile}>
                    Delete File
                  </Button>
                </>
              ) : (
                <Form.Control type="file" onChange={handleFileChange} /> // Nếu không, hiển thị phần select file bình thường
              )}
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
            disabled={!isChecked} // Kích hoạt nút Save Changes chỉ khi checkbox được chọn
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
