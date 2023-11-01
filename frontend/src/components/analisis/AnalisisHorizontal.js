import React, { Component } from "react";
import { Col, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import "./Analisis.css";
import axios from "axios";
import Swal from "sweetalert2";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

class AnalisisHorizontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      periodoInicio: [],
      periodoFin: [],
      rubros: [],
      saldoInicio: 0,
      saldoFin: 0,
      rubro: "",
      cantidadFilas: 0,
      empresas: [],
      analisisHorizontal: [
        {
          cuenta: "",
          valorInicial: 0.0,
          valorFinal: 0.0,
          absoluto: 0.0,
          relativo: "",
        },
      ],
      form: {
        periodoInicio: "",
        periodoFin: "",
        rubro: "",
        empresa: "",
      },
    };
  }

  componentDidMount() {
    //Informacion de los rubros
    axios
      .get("http://127.0.0.1:8000/api/rubros/")
      .then((response) => {
        this.setState({ rubros: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    //Informacio de las empresas
    axios
      .get("http://127.0.0.1:8000/api/empresas/")
      .then((response) => {
        this.setState({ empresas: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Metodo para almacenar los datos ingresados por el usuario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handlePeriodo = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    //informacion de los periodos
    axios
      .get("http://127.0.0.1:8000/api/balances/periodo/", {
        params: {
          empresa: this.state.form.empresa,
        },
      })
      .then((response) => {
        this.setState({ periodos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  peticionGet = async () => {
    //Obtener periodo de incio
    axios
      .get("http://127.0.0.1:8000/api/balances/analisis/", {
        params: {
          empresa: this.state.form.empresa,
          periodo: this.state.form.periodoInicio,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.setState({
          periodoInicio: response.data,
          saldoInicio: 2,
          cantidadFilas: response.data.length,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ saldoInicio: 0, rubro: "" });
      });

    //Obtener periodo de fin
    axios
      .get("http://127.0.0.1:8000/api/balances/analisis/", {
        params: {
          empresa: this.state.form.empresa,
          periodo: this.state.form.periodoFin,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.setState({ periodoFin: response.data, saldoFin: 2 });
        //Metodo para asignar las cuentas
        this.asignacionCuentas();
        //Metodo para guardar el analisis
        this.peticionPost();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ saldoFin: 1, rubro: "" });
      });
  };

  //Metodo que realiza el calculo del analisis horizontal
  asignacionCuentas() {
    const cuenta = [];
    for (var i = 0; i < this.state.periodoInicio.length; i++) {
      cuenta[i] = {
        posicion: i,
        id: this.state.periodoInicio[i].id,
        nombre: this.state.periodoInicio[i].nombre,
        saldoInicio: this.state.periodoInicio[i].valor,
        saldoFin: this.state.periodoFin[i].valor,
      };
    }
    for (var j = 0; j < this.state.rubros.length; j++) {
      if (
        parseInt(this.state.form.rubro) === parseInt(this.state.rubros[j].id)
      ) {
        this.setState({ rubro: this.state.rubros[j].nombre });
      }
    }
    this.setState({ cuentas: cuenta });
  }

  peticionPost = async () => {
    axios
      .get("http://127.0.0.1:8000/api/analisisHorizontal/existencia/", {
        params: {
          empresa: this.state.form.empresa,
          periodoAnterior: this.state.form.periodoInicio,
          periodoActual: this.state.form.periodoFin,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.datosTabla();
        if (response.data.length <= 0) {
          const arregloInicial = this.state.analisisHorizontal;
          for (var i = 0; i < arregloInicial.length; i++) {
            axios
              .post("http://127.0.0.1:8000/api/analisisHorizontal/", {
                valor_anterior: arregloInicial[i].valorInicial,
                valor_actual: arregloInicial[i].valorFinal,
                anio_actual: this.state.form.periodoFin,
                anio_anterior: this.state.form.periodoInicio,
                rubro: this.state.form.rubro,
                valor_absoluto: arregloInicial[i].absoluto,
                valor_relativo: arregloInicial[i].relativo,
                empresa_id: this.state.form.empresa,
                cuenta_id: arregloInicial[i].cuenta,
              })
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
            if (i + 1 === arregloInicial.length) {
              Swal.fire({
                position: "center",
                icon: "success",
                title:
                  "Se guardo el analisis realizado, por ser la primera vez que lo realiza.",
                showConfirmButton: true,
              });
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  datosTabla() {
    var datos = [];
    const obtener = document.getElementById("analisis").tBodies[0];
    for (var j = 0; j < this.state.cantidadFilas; j++) {
      datos[j] = {
        cuenta: obtener.rows[j].cells[1].innerHTML,
        valorInicial: obtener.rows[j].cells[3].innerHTML,
        valorFinal: obtener.rows[j].cells[4].innerHTML,
        absoluto: obtener.rows[j].cells[5].innerHTML,
        relativo: obtener.rows[j].cells[6].innerHTML,
      };
    }
    this.setState({ analisisHorizontal: datos });
  }

  render() {
    const { form } = this.state;
    return (
      <div>
        <Opciones
          estilos={"opciones-horizontal"}
          opciones={
            <>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Empresa</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione la empresa que desee</Tooltip>}
                  >
                    <Form.Select
                      id="empresa"
                      name="empresa"
                      value={form.empresa}
                      onChange={this.handlePeriodo}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.empresas.map((elemento) => (
                        <option key={elemento.id} value={elemento.id}>
                          {elemento.nombre}
                        </option>
                      ))}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de inicio</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de inicio</Tooltip>}
                  >
                    <Form.Select
                      id="periodoInicio"
                      name="periodoInicio"
                      value={form.periodoInicio}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.periodos.map((elemento) => (
                        <option key={elemento.anio} value={elemento.anio}>
                          {elemento.anio}
                        </option>
                      ))}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Periodo de fin</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione periodo de fin</Tooltip>}
                  >
                    <Form.Select
                      id="periodoFin"
                      name="periodoFin"
                      value={form.periodoFin}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.periodos.map((elemento) => (
                        <option key={elemento.anio} value={elemento.anio}>
                          {elemento.anio}
                        </option>
                      ))}
                    </Form.Select>
                  </OverlayTrigger>
                </Form.Group>
              </Col>
              <Col md="auto pt-2">
                <Form.Group>
                  <Form.Label>Rubro</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione un rubro</Tooltip>}
                  >
                    <Form.Select
                      id="rubro"
                      name="rubro"
                      value={form.rubro}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.rubros.map((elemento) => (
                        <option key={elemento.id} value={elemento.id}>
                          {elemento.nombre}
                        </option>
                      ))}
                      <option key="todo" value="todo">
                        Todos
                      </option>
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
              <Button variant="secondary" onClick={() => this.peticionGet()}>
                Realizar análisis
              </Button>
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
                  "Analisis Horizontal " +
                  form.periodoInicio +
                  "-" +
                  form.periodoFin
                }
              />
            </>
          }
          botonExcel={
            <ReactHTMLTableToExcel
              id="botonExcel"
              className="btn btn-success"
              table="analisis"
              filename={
                "Analisis Horizontal " +
                this.state.form.periodoInicio +
                "-" +
                this.state.form.periodoFin
              }
              sheet="Analisis_Horizontal"
              buttonText="EXCEL"
            />
          }
        />
        <TablaAnalisis
          ref={(el) => (this.componentRef = el)}
          tituloTabla={"Analisis Horizontal - " + this.state.rubro}
          columnas={
            <>
              <th>#</th>
              <th className="no-ver">id</th>
              <th>Cuenta</th>
              <th>Periodo {form.periodoInicio}</th>
              <th>Periodo {form.periodoFin}</th>
              <th>V. Absoluto</th>
              <th>V. Relativo</th>
            </>
          }
          filas={
            <>
              {this.state.saldoInicio === this.state.saldoFin ? (
                this.state.cuentas.map((elemento) => (
                  <tr>
                    <td>{elemento.posicion + 1}</td>
                    <td className="no-ver">{elemento.id}</td>
                    <td>{elemento.nombre}</td>
                    <td>{elemento.saldoInicio}</td>
                    <td>{elemento.saldoFin}</td>
                    <td>
                      {(elemento.saldoFin - elemento.saldoInicio).toFixed(2)}
                    </td>
                    <td>
                      {(
                        (elemento.saldoFin / elemento.saldoInicio - 1) *
                        100
                      ).toFixed(2) + " %"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay registros</td>
                </tr>
              )}
            </>
          }
        />
      </div>
    );
  }
}

export default AnalisisHorizontal;
