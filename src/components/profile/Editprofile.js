import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";

export default function Editprofile({ user, onUpdateUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    image: user.image,
    oldPassword: "",
    newPassword: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    console.log(file);
    const selectedImageFile = file[0];
    setFormData((prevData) => ({
      ...prevData,
      image: selectedImageFile,
    }));
  };

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      image: user.image,
    });
  }, [user]);

  const handleSave = async () => {
    if (formData.confirm_password !== formData.newPassword) {
      toast.error("New password does not match");
    } else {
      try {
        // Tạo formData mới để tránh việc gửi cùng formData ban đầu
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("email", formData.email);
        // Kiểm tra và thêm oldPassword
        if (formData.oldPassword) {
          formDataToSend.append("oldPassword", formData.oldPassword);
        }

        // Kiểm tra và thêm newPassword
        if (formData.newPassword) {
          formDataToSend.append("newPassword", formData.newPassword);
        }

        formDataToSend.append("image", formData.image);
        console.log("image", formDataToSend);
        await apiClient({
          method: "post",
          url: "https://magazine-web-670c.onrender.com/edit-profile",
          data: formDataToSend,
          headers: { "Content-Type": "multipart/form-data" },
        });

        onUpdateUser();
        toast.success("Update Success");
        handleClose();
      } catch (error) {
        toast.error("Old password is incorrect");
      }
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Button variant="primary" onClick={handleShow}>
          Edit Profile
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files)}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {/* Kiểm tra nếu có ảnh mới thì hiển thị */}
              {formData.image && formData.image instanceof Blob ? (
                <img
                  style={{ width: "250px", height: "350px", marginTop: "10px" }}
                  src={URL.createObjectURL(formData.image)}
                  alt="User Avatar"
                />
              ) : user.image ? ( // Kiểm tra nếu có ảnh cũ thì hiển thị
                <img
                  style={{ width: "250px", height: "350px", marginTop: "10px" }}
                  src={user.image}
                  alt="User Avatar"
                />
              ) : null}
            </div>

            <Form.Group controlId="formOldPass">
              <Form.Label>OldPass</Form.Label>
              <Form.Control
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formNewPass">
              <Form.Label>NewPass</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formConfilmPass">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleInputChange}
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
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
