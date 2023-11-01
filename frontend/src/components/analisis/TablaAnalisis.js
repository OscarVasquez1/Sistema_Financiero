import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";

export default class TablaAnalisis extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container className="pt-4">
        <div className="text-center">
          <h3>{this.props.tituloTabla}</h3>
        </div>
        <div>
          <Table responsive="sm" className="text-center" hover={false} id="analisis">
            <thead>
              <tr>{this.props.columnas}</tr>
            </thead>
            <tbody>{this.props.filas}</tbody>
          </Table>
        </div>
        <div>{this.props.boton}</div>
      </Container>
    );
  }
}
