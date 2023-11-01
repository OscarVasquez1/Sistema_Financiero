import React, { Component } from "react";
import { Col, Form, Button, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import Swal from "sweetalert2";
import "../../App.css";
import Opciones from "../analisis/Opciones";
import "./Grafica.css";
import ReactToPrint from "react-to-print";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

class Graficar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: [],
      label: [],
      valores: [],
      nombreC: "",
      codigo: "",
      peridoI: [],
      cuentasP: [],
      empresaNombre: [],
      form: {
        periodoInicio: "",
        periodoFin: "",
        cuenta: "",
        empresaNombre: "",
      },
    };
  }
  componentDidMount() {
    /*fetch(`http://127.0.0.1:8000/api/cuentaEmpresa/${}`,
      {
        method:"GET",
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          cuentasP:data
        })
        console.log(data)
      })*/

    fetch(`http://127.0.0.1:8000/api/EmpresasG/`, {
      method: "GET",
      //body: JSON.stringify({empresa:3}),
      /*headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }*/
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          empresaNombre: data,
        });
        console.log(this.state.empresaNombre);
      });
  }

  //Metodo para almacenar datos de usuario
  graficar = () => {
    console.log(this.state.form.periodoInicio);
    const grafi = {
      idCuenta: this.state.form.cuenta,
      idEmpresa: this.state.form.empresaNombre,
      anioIni: this.state.form.periodoInicio,
      anioFin: this.state.form.periodoFin,
    };
    if (
      this.state.form.cuenta === "" ||
      this.state.form.periodoInicio === "" ||
      this.state.form.periodoFin === "" ||
      this.state.form.empresaNombre === ""
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Rellenar los campos solicitados.(Período de Inicio o Fin, Cuenta)",
        showConfirmButton: true,
      });
    } else {
      fetch("http://localhost:8000/api/graficar", {
        method: "POST",
        body: JSON.stringify(grafi),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            label: data.map((g) => g.anio),
            valores: data.map((g) => g.valor),
            nombreC: data[0].cuenta.nombre,
            codigo: data[0].cuenta.codigo,
          });
          console.log(data);
        });
      console.log(grafi);
      /*console.log(this.state.form.periodoInicio,this.state.form.periodoFin,this.state.form.cuenta)*/
    }
  };

  handleChange = async (e) => {
    console.log(e);
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });

    if (this.state.form.empresaNombre !== "") {
      console.log(this.state.form.empresaNombre);
      fetch(
        `http://127.0.0.1:8000/api/cuentaEmpresa/${this.state.form.empresaNombre}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            cuentasP: data,
          });
          console.log(data);
        });

      fetch(
        `http://127.0.0.1:8000/api/balances/periodo?empresa=${this.state.form.empresaNombre}`,
        {
          method: "GET",
          //body: JSON.stringify({empresa:3}),
          /*headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }*/
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            peridoI: data,
          });
          console.log(this.state.peridoI);
        });
    }
  };

  render() {
    let graficoOculto = false;
    if (
      this.state.nombreC === "" ||
      this.state.valores.length === 0 ||
      this.state.label.length === 0
    ) {
      graficoOculto = false;
    } else {
      graficoOculto = true;
    }
    return (
      <div>
        <Opciones
          estilos={"opciones-grafico"}
          opciones={
            <>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Seleccione Empresa: </Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione una Empresa</Tooltip>}
                  >
                    <Form.Select
                      onChange={this.handleChange}
                      name="empresaNombre"
                    >
                      <option>Seleccione una Empresa</option>
                      {this.state.empresaNombre.map((p) => {
                        return (
                          <option key={p.id} value={p.id}>
                            {p.nombre}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Perido de Inicio:</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de inicio</Tooltip>}
                  >
                    <Form.Select
                      onChange={this.handleChange}
                      name="periodoInicio"
                    >
                      <option>Seleccione Año</option>
                      {this.state.peridoI.map((p) => {
                        return (
                          <option key={p.anio} value={p.anio}>
                            {p.anio}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Fin de Periodo:</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de fin</Tooltip>}
                  >
                    <Form.Select onChange={this.handleChange} name="periodoFin">
                      <option>Seleccione Año</option>
                      {this.state.peridoI.map((p) => {
                        return (
                          <option key={p.anio} value={p.anio}>
                            {p.anio}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>

              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Seleccione Cuenta: </Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione una Cuenta</Tooltip>}
                  >
                    <Form.Select onChange={this.handleChange} name="cuenta">
                      <option>Seleccione Cuenta</option>
                      {this.state.cuentasP.map((p) => {
                        return (
                          <option key={p.id} value={p.id}>
                            {p.nombre}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
            </>
          }
          botonAnalisis={
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Si no aparece ninguna opción de selección, no hay conexion a
                  la base de datos
                </Tooltip>
              }
            >
              <Button onClick={() => this.graficar()}>Graficar</Button>
            </OverlayTrigger>
          }
          botonPdf={
            <>
              <ReactToPrint
                trigger={() => (
                  <Button variant="danger">
                    <PictureAsPdfIcon />
                  </Button>
                )}
                content={() => this.componentRef}
                documentTitle={
                  "Grafico de variación " +
                  this.state.form.periodoInicio +
                  "-" +
                  this.state.form.periodoFin
                }
              />
            </>
          }
        />

        <Container fluid="md" ref={(el) => (this.componentRef = el)} className="pt-4 pb-5">
          <div className="izquierda">
            <p>Saldo</p>
          </div>
          <Line
            className={graficoOculto ? "" : "graficoOculto"}
            data={{
              labels: this.state.label,
              datasets: [
                {
                  label: this.state.nombreC,
                  data: this.state.valores,
                  fill: false,
                  borderColor: "rgb(75,192,192)",
                  tension: 0.1,
                },
              ],
            }}
          />
          <div className="derecha">
            <p>Periodos</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default Graficar;
