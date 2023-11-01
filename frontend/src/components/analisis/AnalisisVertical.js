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

class AnalisisVertical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cuentas: [],
      periodos: [],
      rubros: [],
      totalRubro: 0.0,
      rubro: "",
      cantidadFilas: 0,
      empresas: [],
      analisisVertical: [
        {
          cuenta: "",
          saldo: 0.0,
          vertical: "",
        },
      ],
      form: {
        periodo: "",
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

  //Obtiene los datos de la BD
  peticionGet = async () => {
    axios
      .get("http://127.0.0.1:8000/api/balances/analisis/", {
        params: {
          empresa: this.state.form.empresa,
          periodo: this.state.form.periodo,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.setState({
          cuentas: response.data,
          cantidadFilas: response.data.length,
        });
        //Metodo para el calculo del analisis
        this.calculo();
        //Metodo para guardar el analisis
        this.peticionPost();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ rubro: "" });
      });
  };

  calculo() {
    var total = 0.0;
    for (var i = 0; i < this.state.cuentas.length; i++) {
      total += parseFloat(this.state.cuentas[i].valor);
    }
    for (var j = 0; j < this.state.rubros.length; j++) {
      if (
        parseInt(this.state.form.rubro) === parseInt(this.state.rubros[j].id)
      ) {
        this.setState({ rubro: this.state.rubros[j].nombre });
      }
    }
    this.setState({ totalRubro: total });
  }

  peticionPost = async () => {
    axios
      .get("http://127.0.0.1:8000/api/analisisVertical/existencia/", {
        params: {
          empresa: this.state.form.empresa,
          periodo: this.state.form.periodo,
          rubro: this.state.form.rubro,
        },
      })
      .then((response) => {
        this.datosTabla();
        if (response.data.length <= 0) {
          const arregloInicial = this.state.analisisVertical;
          for (var i = 0; i < arregloInicial.length; i++) {
            axios
              .post("http://127.0.0.1:8000/api/analisisVertical/", {
                valor: arregloInicial[i].saldo,
                anio: this.state.form.periodo,
                rubro: this.state.form.rubro,
                valor_vertical: arregloInicial[i].vertical,
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
                  "Se guardo el analisis realizado por ser la primera vez que lo realiza.",
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
        saldo: obtener.rows[j].cells[3].innerHTML,
        vertical: obtener.rows[j].cells[4].innerHTML,
      };
    }
    this.setState({ analisisVertical: datos });
  }

  render() {
    const { form } = this.state;
    return (
      <>
        <div>
          <Opciones
            estilos={"opciones-vetical"}
            opciones={
              <>
                <Col md="auto pt-2">
                  <Form.Group>
                    <Form.Label>Empresa</Form.Label>
                    <OverlayTrigger
                      placement="right"
                      overlay={
                        <Tooltip>Seleccione la empresa que desee</Tooltip>
                      }
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
                    <Form.Label>Periodo</Form.Label>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>Seleccione un periodo</Tooltip>}
                    >
                      <Form.Select
                        id="periodo"
                        name="periodo"
                        value={form.periodo}
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
              <ReactToPrint
                trigger={() => (
                  <Button variant="danger">
                    <PictureAsPdfIcon />
                  </Button>
                )}
                content={() => this.componentRef}
                documentTitle={"Analisis Vertical " + form.periodo}
              />
            }
            botonExcel={
              <ReactHTMLTableToExcel
                id="botonExcel"
                className="btn btn-success"
                table="analisis"
                filename={"Analisis Vertical " + this.state.form.periodo}
                sheet="Analisis_Vertical"
                buttonText="EXCEL"
              />
            }
          />
        </div>
        <div id="tabla">
          <TablaAnalisis
            ref={(el) => (this.componentRef = el)}
            tituloTabla={"Analisis Vertical - " + this.state.rubro}
            columnas={
              <>
                <th>#</th>
                <th className="no-ver">id</th>
                <th>Cuenta</th>
                <th>Periodo {form.periodo}</th>
                <th>Analísis vetical</th>
              </>
            }
            filas={
              <>
                {this.state.cuentas.length >= 1 ? (
                  this.state.cuentas.map((elemento) => (
                    <tr>
                      <td>{this.state.cuentas.indexOf(elemento) + 1}</td>
                      <td className="no-ver">{elemento.id}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.valor}</td>
                      <td>
                        {(
                          (elemento.valor / this.state.totalRubro) *
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
      </>
    );
  }
}

export default AnalisisVertical;
