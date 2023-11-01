import React, {Component} from "react";
import { Col, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import Opciones from "./Opciones";
import TablaAnalisis from "./TablaAnalisis";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

class InformeRatios extends Component {
    constructor(props) {
      super(props);
      this.state = {
        periodos: [],
        empresas: [],
        periodoInicio: [],
        periodoFin: [],
        sectores: [],
        razonesFinancieras:[],
        tipoInforme: [],
        sector: "",
        cantidadFilas: 0,
        ratios: [],
        ratiosSectorInicio: [],
        ratiosSectorFin: [],
        promedioSectorInicio: 0,
        promedioSectorFin: 0,
        comparacion: 0,
        diagnostico: "",
        informeRatio: {
          nombreRatio: "",
          valorInicial: 0,
          valorFinal: 0,
          comparacion: 0,
          diagnostico: ""
        },
        form: {
            empresa: "",
            razonFinanciera: "",
            tipoInforme: "",
            periodoInicio: "",
            periodoFin: ""
        }
      };
    }
  
    componentDidMount() {

        //Empresa
        axios
        .get("http://127.0.0.1:8000/api/empresas/")
        .then((response) => {
          this.setState({empresas: response.data});
        })
        .catch((error) => {
          console.log(error);
        });

        //Informacion de las razones
        axios
        .get("http://127.0.0.1:8000/api/razonesFinancieras/")
        .then((response) => {
          this.setState({razonesFinancieras: response.data});
        })
        .catch((error) => {
          console.log(error);
        });
    }

    obtenerPeriodos(){
      //informacion de los periodos
      axios
       .get("http://127.0.0.1:8000/api/ratiosEmpresa/periodo/", {
       params: {
           empresa: this.state.form.empresa
       },
       })
       .then((response) => {
        this.setState({ periodos: response.data });
       })
       .catch((error) => {
        console.log(error);
       });
  }

    peticionGet(){
      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/informe/", {
        params: {
            empresa: this.state.form.empresa,
            razonFinanciera: this.state.form.razonFinanciera,
            periodo: this.state.form.periodoInicio,
        }
      })
      .then((response) => {
          this.setState({
            periodoInicio: response.data,
            cantidadFilas: response.data.length
          });
      })
      .catch((error) => {
        console.log(error);
      })

      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/informe/", {
        params: {
          empresa: this.state.form.empresa,
          razonFinanciera: this.state.form.razonFinanciera,
          periodo: this.state.form.periodoFin,
        }
      })
      .then((response) => {
          this.setState({
            periodoFin: response.data
          })

          this.asignacionRatios();
      })
      .catch((error) => {
        console.log(error);
      })


      //Ratios del sector para sacar promedio
      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/promedio/", {
        params: {
          periodo: this.state.form.periodoInicio,
        }
      })
      .then((response) => {
          this.setState({
            ratiosSectorInicio: response.data
          })
      })
      .catch((error) => {
        console.log(error);
      })

      axios
      .get("http://127.0.0.1:8000/api/ratiosEmpresa/promedio/", {
        params: {
          periodo: this.state.form.periodoFin,
        }
      })
      .then((response) => {
          this.setState({
            ratiosSectorFin: response.data
          })

          this.asignacionRatios();
      })
      .catch((error) => {
        console.log(error);
      })
    }
  
    //Metodo para almacenar los datos ingresados por el usuario
    handleChange = async (e) => {
      e.persist();
      await this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value,
        },
      }
      );

      this.obtenerPeriodos()
    };


    //Metodo que realiza el calculo del analisis horizontal
    asignacionRatios() {
      let info = [];
      let valor_final = 0;
      let comparacion = 0;
      let diagnostico = "";
      let promedioInicio = 0;
      let promedioFin = 0;

      let resIni = 0;
      let resFin = 0;

      for (var i = 0; i < this.state.periodoInicio.length; i++) {

        if(this.state.periodoInicio[i].nombre === this.state.periodoFin[i].nombre){
          valor_final = this.state.periodoFin[i].valor_ratio_empresas;
        }

        if(this.state.form.tipoInforme === "comparacion"){
          comparacion = this.state.periodoInicio[i].parametro_comparacion;
        }
        else if(this.state.form.tipoInforme === "promedio"){
          

          for(let j = 0; j < this.state.ratiosSectorInicio.length; j++){

            if(this.state.periodoInicio[i].nombre === this.state.ratiosSectorInicio[j].nombre){
              resIni += (this.state.ratiosSectorInicio[j].valor_ratio_empresas);
            }

            if(this.state.periodoFin[i].nombre === this.state.ratiosSectorFin[j].nombre){         
              resFin += (this.state.ratiosSectorFin[j].valor_ratio_empresas);
            }
              
          }



          promedioInicio = (resIni/2).toFixed(2);
          promedioFin = (resFin/2).toFixed(2);

          resIni = 0;
          resFin = 0;
        }
        

        if(this.state.form.tipoInforme === "comparacion"){
          if(this.state.periodoInicio[i].valor_ratio_empresas >= comparacion && valor_final >= comparacion){
            diagnostico = "Aceptado";
          }
          else if((this.state.periodoInicio[i].valor_ratio_empresas >= comparacion && valor_final <= comparacion) || (this.state.periodoInicio[i].valor_ratio_empresas <= comparacion && valor_final >= comparacion)){
            diagnostico = "Revisión";
          }
          else if(this.state.periodoInicio[i].valor_ratio_empresas <= comparacion && valor_final <= comparacion){
            diagnostico = "Denegado";
          }
        }

        if(this.state.form.tipoInforme === "promedio"){
          if(this.state.periodoInicio[i].valor_ratio_empresas >= promedioInicio && valor_final >= promedioFin){
            diagnostico = "Aceptado";
          }
          else if((this.state.periodoInicio[i].valor_ratio_empresas >= promedioInicio && valor_final <= promedioFin) || (this.state.periodoInicio[i].valor_ratio_empresas <= promedioInicio && valor_final >= promedioFin)){
            diagnostico = "Revisión";
          }
          else if(this.state.periodoInicio[i].valor_ratio_empresas <= promedioInicio && valor_final <= promedioFin){
            diagnostico = "Denegado";
          }
        }


        info[i] = {
          posicion: i,
          id: this.state.periodoInicio[i].id,
          nombre: this.state.periodoInicio[i].nombre,
          valorInicio: this.state.periodoInicio[i].valor_ratio_empresas,
          valorFinal: valor_final,
          anioIni: this.state.periodoInicio[i].anio_referencia,
          anioFin: this.state.periodoFin[i].anio_referencia,
          comparacion: comparacion,
          promInicial: promedioInicio,
          promFin: promedioFin, 
          diagnostico: diagnostico
        };
      }

      this.setState({ ratios: info });
    }
  
    datosTabla() {
      var datos = [];
      const obtener = document.getElementById("analisis").tBodies[0];
      for (var j = 0; j < this.state.cantidadFilas; j++) {
        datos[j] = {
          nombreRatio: obtener.rows[j].cells[1].innerHTML,
          valorInicial: obtener.rows[j].cells[3].innerHTML,
          valorFinal: obtener.rows[j].cells[4].innerHTML,
          comparacion: obtener.rows[j].cells[5].innerHTML,
          diagnostico: obtener.rows[j].cells[6].innerHTML,
        };
      }
      this.setState({ informeRatio: datos });
    }

    render() {
      const { form } = this.state;
      return (
        <div>
        <Opciones
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
                      onChange={this.handleChange}
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
                  <Form.Label>Razón Financiera</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione razón financiera</Tooltip>}
                  >
                    <Form.Select
                      id="razonFinanciera"
                      name="razonFinanciera"
                      value={form.razonFinanciera}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true}>
                        Seleccione...
                      </option>
                      {this.state.razonesFinancieras.map((elemento) => (
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
                  <Form.Label>Tipo de Informe</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Seleccione un tipo de informe</Tooltip>}
                  >
                    <Form.Select
                      id="tipoInforme"
                      name="tipoInforme"
                      value={form.tipoInforme}
                      onChange={this.handleChange}
                    >
                      <option value="" disabled={true} selected={true}>
                        Seleccione...
                      </option>
                      <option value="comparacion">
                        Comparación Sector
                      </option>
                      <option value="promedio">
                        Promedio Empresa
                      </option>
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
                        <option key={elemento.anio_referencia} value={elemento.anio_referencia}>
                          {elemento.anio_referencia}
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
                      <option value="" disabled={true} selected={true}>
                        Seleccione...
                      </option>
                      {this.state.periodos.map((elemento) => (
                        <option key={elemento.anio_referencia} value={elemento.anio_referencia}>
                          {elemento.anio_referencia}
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
                Cargar Informe
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
                  "Informe Ratios-" + this.state.form.periodoInicio + "-" + this.state.form.periodoFin
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
                "Informe Ratios " + this.state.form.periodoInicio + "-" + this.state.form.periodoFin
              }
              sheet={"Informe_Ratios_"+ this.state.form.periodoInicio + "_" + this.state.form.periodoFin}
              buttonText="EXCEL"
            />
          }
        />
        <TablaAnalisis
          ref={(el) => (this.componentRef = el)}
          tituloTabla={"Informe Ratios " + this.state.form.periodoInicio + " - " + this.state.form.periodoFin}
          columnas={
            <>
              <th>#</th>
              <th className="no-ver">id</th>
              <th>Nom. Ratio</th>
              <th>Ratio {form.periodoInicio}</th>
              {
                this.state.form.tipoInforme === "promedio" ? (
                  <th>Comparacion {this.state.form.periodoInicio}</th>
                  ): (
                  <th disabled={true}></th>
                  )
              }
              <th>Ratio {form.periodoFin}</th>
              {
                this.state.form.tipoInforme === "promedio" ? (
                  <th>Comparacion {this.state.form.periodoFin}</th>
                  ): (
                  <th>Valor Comparacion</th>
                  )
              }
              <th>Diagnóstico</th>
            </>
          }
          filas={
            <>
              {
                this.state.ratios.length !== 0 ? (
                  this.state.ratios.map(elemento => (
                    <tr>
                      <td>{elemento.posicion + 1}</td>
                      <td className="no-ver">{elemento.id}</td>
                      <td>{elemento.nombre}</td>
                      <td>{elemento.valorInicio}</td>
                      {
                        this.state.form.tipoInforme === "promedio" ? (
                          <td>{elemento.promInicial}</td>
                        ): (
                          <td disabled={true}></td>
                        )
                      }
                      <td>{elemento.valorFinal}</td>
                      {
                        this.state.form.tipoInforme === "promedio" ? (
                          <td>{elemento.promFin}</td>
                        ): (
                          <td>{elemento.comparacion}</td>
                        )
                      }
                      <td>{elemento.diagnostico}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay registros</td>
                  </tr>
                )
              }
            </>
          }
        />
      </div>
      );
    }
  }
  
  export {InformeRatios};