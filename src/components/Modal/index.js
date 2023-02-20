import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Example({ setter }) {
  // * TODO MAKE IT REUSABLE FOR OTHER USE CASE AS WELL
  return (
    <>
      <Modal show={true} animation={false} onHide={() => setter(false)}>
        <Modal.Header closeButton>
          <Modal.Title>The Folder that can be accessed are</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Folder Tree of Folders that can be accessed - Implemented after API
          response
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setter(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Example;
