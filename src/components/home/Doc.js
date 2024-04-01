import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Doc({ item }) {
  return (
    <>
      <Card style={{ width: "300px" }}>
        <Card.Img
          variant="top"
          style={{ height: "300px" }}
          src="https://i.pinimg.com/736x/5e/f6/04/5ef604e0b7f46c13995fd4fd945d8bf8.jpg"
        />
        <hr />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">View</Button>
        </Card.Body>
      </Card>
    </>
  );
}
