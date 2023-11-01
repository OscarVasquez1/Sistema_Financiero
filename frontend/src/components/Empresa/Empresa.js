import React, { Component } from "react";
import { Form, ButtonGroup } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import DataTable from "../datatable/DataTable";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import axios from "axios";
import { Select, Button, InputLabel } from "@material-ui/core";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const Input = styled("input")({
  display: "none",
});
class Empresa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catalogo: [],
      balance: [],
      sectores: [],
      actividades: [],
      empresa: {
        nombre: "",
        descripcion: "",
        actividad_id: "",
        sector_id: "",
      },
      ultima_empresa_id: "",
      unltima_empresa_nombre: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  obtenerUltimaEmpresa() {
    axios.get("http://127.0.0.1:8000/api/ultimaEmpresa").then((response) => {
      this.setState({ ultima_empresa_id: response.data.id.toString() });
      this.setState({ ultima_empresa_nombre: response.data.nombre.toString() });
    });
  }
  leerExcel = (archivo) => {
    const promesa = new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsArrayBuffer(archivo);
      lector.onload = (e) => {
        const bufferArray = e.target.result;
        const libro = XLSX.read(bufferArray, { type: "buffer" });
        const nombreHoja = libro.SheetNames[0];
        const hoja = libro.Sheets[nombreHoja];
        const data = XLSX.utils.sheet_to_json(hoja);
        resolve(data);
      };
    });
    promesa.then((d) => {
      const arreglo_inicial = d;
      const cuenta = [];
      for (var i = 0; i < arreglo_inicial.length; i++) {
        cuenta[i] = {
          codigo: arreglo_inicial[i].Codigo,
          nombre: arreglo_inicial[i].Nombre,
          rubro: arreglo_inicial[i].Rubro,
          rubro_id:
            arreglo_inicial[i].Rubro === "Activos"
              ? 1
              : arreglo_inicial[i].Rubro === "Costos"
              ? 2
              : arreglo_inicial[i].Rubro === "Gastos"
              ? 3
              : arreglo_inicial[i].Rubro === "Ingresos"
              ? 4
              : arreglo_inicial[i].Rubro === "Pasivos"
              ? 5
              : 6,
          tipoDeCuenta: arreglo_inicial[i].TipoDeCuenta,
          tipo_id:
            arreglo_inicial[i].TipoDeCuenta === "Activo Circulante"
              ? 1
              : arreglo_inicial[i].TipoDeCuenta === "Activo Fijo"
              ? 2
              : arreglo_inicial[i].TipoDeCuenta === "Activo Total"
              ? 3
              : arreglo_inicial[i].TipoDeCuenta === "Costo de Ventas"
              ? 4
              : arreglo_inicial[i].TipoDeCuenta === "Cuentas por Cobrar"
              ? 5
              : arreglo_inicial[i].TipoDeCuenta === "Cuentas por Pagar"
              ? 6
              : arreglo_inicial[i].TipoDeCuenta === "Efectivo"
              ? 7
              : arreglo_inicial[i].TipoDeCuenta === "Gastos Financieros"
              ? 8
              : arreglo_inicial[i].TipoDeCuenta === "Ingresos"
              ? 9
              : arreglo_inicial[i].TipoDeCuenta === "Inventario"
              ? 10
              : arreglo_inicial[i].TipoDeCuenta === "Otro Tipo de Cuenta"
              ? 11
              : arreglo_inicial[i].TipoDeCuenta === "Pasivo Circulante"
              ? 12
              : arreglo_inicial[i].TipoDeCuenta === "Pasivo Total"
              ? 13
              : arreglo_inicial[i].TipoDeCuenta === "Patrimonio"
              ? 14
              : arreglo_inicial[i].TipoDeCuenta === "Utilidades Antes de Impuestos"
              ? 15
              : arreglo_inicial[i].TipoDeCuenta === "Utilidad Bruta"
              ? 16
              : arreglo_inicial[i].TipoDeCuenta === "Utilidad Neta"
              ? 17
              : 18,
          empresa_id: this.state.ultima_empresa_id,
        };
      }

      this.setState({ catalogo: cuenta });
      console.log(this.state.catalogo);
    });
  };

  leerBalance = (archivo) => {
    const promesa = new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsArrayBuffer(archivo);
      lector.onload = (e) => {
        const bufferArray = e.target.result;
        const libro = XLSX.read(bufferArray, { type: "buffer" });
        const nombreHoja = libro.SheetNames[0];
        const hoja = libro.Sheets[nombreHoja];
        const data = XLSX.utils.sheet_to_json(hoja);
        resolve(data);
      };
    });
    promesa.then((d) => {
      const arreglo_inicial = d;
      const cuenta = [];
      for (var i = 0; i < arreglo_inicial.length; i++) {
        cuenta[i] = {
          anio: arreglo_inicial[i].anio,
          valor: arreglo_inicial[i].valor,
          nombre_cuenta: arreglo_inicial[i].nombre_cuenta,
          codigo_cuenta: arreglo_inicial[i].codigo_cuenta,
          empresa_id: this.state.ultima_empresa_id,
          nombre_empresa: arreglo_inicial[i].nombre_empresa,
        };
      }

      this.setState({ balance: cuenta });
      console.log(this.state.balance);
    });
  };
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/sectoresConActividad/")
      .then((response) => {
        this.setState({ sectores: response.data });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Por el momento no hay conexión con la base de datos",
        });
      });
  }
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      empresa: {
        ...this.state.empresa,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleSector = async (e) => {
    e.persist();
    await this.setState({
      empresa: {
        ...this.state.empresa,
        [e.target.name]: e.target.value,
      },
    });
    axios
      .get("http://127.0.0.1:8000/api/actividadesPorSector/", {
        params: { id: this.state.empresa.sector_id },
      })
      .then((response) => {
        this.setState({ actividades: response.data });
      })
      .catch((error) => {});
  };

  guardarDatos = async () => {
    console.log(this.state.empresa);
    await axios
      .post("http://127.0.0.1:8000/api/empresas", {
        nombre: this.state.empresa.nombre,
        descripcion: this.state.empresa.descripcion,
        actividad_id: this.state.empresa.actividad_id,
      })
      .then((response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Los datos de la empresa se han guardado con éxito",
          showConfirmButton: true,
        });
        this.obtenerUltimaEmpresa();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error en el proceso",
          showConfirmButton: true,
        });
      });
  };
  guardarCatalogo = async () => {
    console.log(this.state.catalogo.length);
    const arreglo_inicial = this.state.catalogo;
    const cuenta = [];
    var contador = 0;
    for (var i = 0; i < arreglo_inicial.length; i++) {
      cuenta[i] = {
        codigo: arreglo_inicial[i].codigo,
        nombre: arreglo_inicial[i].nombre,
        rubro_id: arreglo_inicial[i].rubro_id,
        tipo_id: arreglo_inicial[i].tipo_id,
        empresa_id: arreglo_inicial[i].empresa_id,
      };
      axios
        .post("http://localhost:8000/api/cuentas", {
          codigo: cuenta[i].codigo,
          nombre: cuenta[i].nombre,
          rubro_id: cuenta[i].rubro_id,
          tipo_id: cuenta[i].tipo_id,
          empresa_id: cuenta[i].empresa_id,
        })
        .then((response) => {});
      contador++;
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Los datos de " + contador + " cuentas se han guardado con éxito",
      showConfirmButton: true,
    });
  };
  guardarBalance = async () => {
    const arreglo_inicial = this.state.balance;
    const cuenta = [];
    var contador = 0;
    for (var i = 0; i < arreglo_inicial.length; i++) {
      cuenta[i] = {
        anio: arreglo_inicial[i].anio,
        valor: arreglo_inicial[i].valor,
        empresa_id: arreglo_inicial[i].empresa_id,
        cuenta_id: arreglo_inicial[i].codigo_cuenta,
      };
      axios
        .post("http://localhost:8000/api/balances", {
          anio: cuenta[i].anio,
          valor: cuenta[i].valor,
          empresa_id: cuenta[i].empresa_id,
          cuenta_id: cuenta[i].cuenta_id,
        })
        .then((response) => {});
      contador++;
    }
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Los saldos de " + contador + " cuentas se han guardado con éxito",
      showConfirmButton: true,
    });
  };
  render() {
    const columns = [
      {
        name: "codigo",
        label: "Código",
      },
      {
        name: "nombre",
        label: "Nombre",
      },
      {
        name: "tipo_id",
        label: "Tipo de Cuenta ID",
      },
      {
        name: "tipoDeCuenta",
        label: "Tipo de Cuenta",
      },
      {
        name: "rubro_id",
        label: "Rubro ID",
      },
      {
        name: "rubro",
        label: "Rubro",
      },
    ];
    const columnsBalance = [
      {
        name: "codigo_cuenta",
        label: "Código",
      },
      {
        name: "nombre_cuenta",
        label: "Nombre",
      },
      {
        name: "anio",
        label: "Año",
      },
      {
        name: "valor",
        label: "Saldo",
      },
      {
        name: "nombre_empresa",
        label: "Empresa",
      },
    ];
    return (
      <>
        <Box sx={{ flexGrow: 1, overflow: "hidden" }} >
            <Form>
          <Paper sx={{ maxWidth: 720, my: 1, mx: "auto", p: 2 }}  className="cuadro-empresa">
            <Grid>
              
                <Form.Group>
                  <Grid>
                    <Form.Label>Nombre de la empresa:</Form.Label>
                  </Grid>
                  <Grid>
                    <Form.Control
                      id="nombre"
                      name="nombre"
                      value={this.state.empresa.nombre}
                      type="text"
                      placeholder=""
                      maxLength="50"
                      required={true}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Grid>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descripción de la empresa:</Form.Label>
                  <Form.Control
                    id="descripcion"
                    name="descripcion"
                    value={this.state.empresa.descripcion}
                    type="text"
                    placeholder=""
                    maxLength="50"
                    required={true}
                    onChange={this.handleChange}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <InputLabel id="actividad_label"style={{marginTop:'.9rem'}}>
                    Sector y Actividad
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    labelId="actividad_label"
                    id="actividad_id"
                    name="actividad_id"
                    onChange={this.handleChange}
                    label="Actividad"
                    style={{marginTop:'.9rem'}}
                  >
                    <option value="" disabled={true}>
                      Seleccione..
                    </option>
                    {this.state.sectores.map((elemento) => (
                      <optgroup
                        key={elemento.id}
                        value={elemento.id}
                        label={elemento.nombre}
                      >
                        {elemento.actividades.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.nombre}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </Select>
                </Form.Group>
                <Form.Group>
                  <ButtonGroup onClick={this.guardarDatos}>
                    <Button style={{marginTop:'.9rem'}} variant="contained">Guardar Empresa</Button>
                  </ButtonGroup>
                </Form.Group>
              
            </Grid>
          </Paper>
          </Form>
          {/* Formularo para el catalgo de cuentas */}
          {this.state.ultima_empresa_id !== "" ?  
          <Form>
            <Paper sx={{ maxWidth: 720, my: 2, mx: "auto", p: 2 }} className="cuadro-empresa">
              <Grid container spacing={0}>
                <Form.Group>
                  <Form.Label>Suba su catálogo de cuentas:</Form.Label>
                  {"              "}
                  <label htmlfor="archivo_input">
                    <Input
                      id="archivo_input"
                      accept="xlsx"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        this.leerExcel(file);
                      }}
                    />
                    <Button
                      style={{marginLeft:'.9rem'}}
                      component="span"
                      variant="contained"
                      startIcon={<FileUploadIcon />}
                    >
                      Subir Catalogo
                    </Button>
                  </label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Datos desde Excel:</Form.Label>
                  {this.state.catalogo !== 0 ? 
                  <DataTable
                    id="datatable_catalogo"
                    titulo="Catalogo de cuentas"
                    noRegistro="No se ha cargado ningun registro..."
                    columnas={columns}
                    datos={this.state.catalogo}
                  />
                   : ""  
                  } 
                </Form.Group>
                <Form.Group>
                    <Button style={{marginTop:'.9rem'}} variant="contained" onClick={this.guardarCatalogo}>Guardar Catálogo</Button>
                </Form.Group>
              </Grid>
            </Paper>
            <Paper sx={{ maxWidth: 720, my: 1, mx: "auto", p: 2 }} className="cuadro-empresa">
              <Grid  spacing={0}>
                <Form.Group>
                  <Form.Label>Suba su balance:</Form.Label>
                  <label htmlfor="archivo_input_balance">
                    <Input
                      id="archivo_input_balance"
                      accept="xlsx"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        this.leerBalance(file);
                      }}
                    />
                    <Button
                    style={{marginLeft:'.9rem'}}
                      component="span"
                      variant="contained"
                      startIcon={<FileUploadIcon />}
                    >
                      Subir Balance
                    </Button>
                  </label>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Datos desde Excel:</Form.Label>
                  { this.state.balance !== 0 ? 
                  <DataTable
                    id="datatable_balance"
                    titulo="Balance"
                    noRegistro="No se ha cargado ningun registro..."
                    columnas={columnsBalance}
                    datos={this.state.balance}
                  />
                   : ""  
                   } 
                </Form.Group>
                <Form.Group>
                  <ButtonGroup onClick={this.guardarBalance}>
                    <Button style={{marginTop:'.9rem'}} variant="contained">Guardar Balance</Button>
                  </ButtonGroup>
                </Form.Group>
              </Grid>
            </Paper>
          </Form>

           : ""  
           } 
        </Box>
      </>
    );
  }
}
export default Empresa;
