import React from "react";
import { Container, Row, Col} from "react-bootstrap";

export default function opciones(props) {
  return (
    <Container className={props.estilos + " pb-2 text-center pt-2 pb-4"}>
      <Row className="justify-content-md-center">
        {props.opciones}
        <Col md="auto" className="align-self-end pt-3">
          {props.botonAnalisis}
        </Col>
        <Col md="auto" className="align-self-end pt-3">
          {props.botonPdf}
        </Col>
        <Col md="auto" className="align-self-end pt-3">
          {props.botonExcel}
        </Col>
      </Row>
    </Container>
  );
}
