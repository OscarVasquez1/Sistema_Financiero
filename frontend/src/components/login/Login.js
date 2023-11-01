import React, { Component } from "react";
import { Card, Container, Form, Button, FloatingLabel } from "react-bootstrap";
import "./Login.css";
import LoginIcon from "@mui/icons-material/Login";

class Login extends Component {
  render() {
    return (
      <Container className="form-container">
        <Card className="login-form">
          <Card.Body>
            <Card.Title className="text-center titulo">Inicio sesión</Card.Title>
            <Card.Text>
              <Form className="formulario">
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Usuario"
                    className="mb-4"
                  >
                    <Form.Control
                      type="text"
                      id="usuario"
                      name="usuario"
                      placeholder="Usuario"
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Contraseña"
                  >
                    <Form.Control
                      type="password"
                      id="password"
                      name="password"
                      placeholder="*******"
                    />
                  </FloatingLabel>
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="d-flex justify-content-center">
              <Button className="boton d-flex justify-content-center">
                <LoginIcon/>
                <span className="texto-boton">Ingresar</span>
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

export default Login;
