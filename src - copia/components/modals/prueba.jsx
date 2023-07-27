import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { openModal, closeModal } from './modalHandler';

// function Buttons () {
//     return (
//         // <div className="custom-button" style={{ textAlign: 'center'}}>
//         <div className="custom-button gap-2 py-3" style={{ display: 'flex', justifyContent: 'center', border: '2px solid #black', width: '100%', height: '100%'}}>
//         <Button variant="danger">Presione1</Button>
//         <Button variant="primary">Aceptar</Button>
//         </div>

//     )
// }

function Buttons() {
  const [show, setShow] = useState(false);

  const clickHandle = () => {
    // setShow(true);
    openModal(setShow)
  };

  const clickcloseModal = () => {
    // setShow(false);
    closeModal(setShow)
  };

  return (
    <>
      <div
        className="custom-button gap-2 py-2"
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid #black",
          width: "100%",
          height: "100%",
        }}
      >
        <Button variant="primary" onClick={clickHandle} className="">
          Presione Modal
        </Button>

        <Modal show={show} onHide={clickcloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={clickcloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={clickcloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div
        className="custom-button gap-2 py-3"
        style={{
          display: "flex",
          justifyContent: "center",
          border: "4px solid #red",
          width: "100%",
          height: "100%",
        }}
      >
        <Button variant="danger">Presione1</Button>
        <Button variant="primary">Aceptar</Button>
      </div>
    </>
  );
}

export default Buttons;
