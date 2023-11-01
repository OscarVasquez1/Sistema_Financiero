import React from "react";
import { Form  } from "react-bootstrap";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function modalCu(props){
    return (
      <Modal isOpen={props.abrir} centered>
        <ModalHeader style={{ display: "block" }}>
          {props.tipoModal === "insertar" ? (
            <span>Crear {props.titulo}</span>
          ) : (
            <span>Actualizar {props.titulo}</span>
          )}
        </ModalHeader>
        <ModalBody>
          <Form.Group>
            {props.formulario}
          </Form.Group>
          <ModalFooter>
            {props.pieModal}
          </ModalFooter>
        </ModalBody>
      </Modal>
    );
  }
