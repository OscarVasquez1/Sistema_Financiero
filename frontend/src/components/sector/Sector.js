import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Tooltip } from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import DataTable from "../datatable/DataTable";

class Sector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectores: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        id: "",
        nombre: "",
        descripcion: "",
      },
    };
  }

  //Metodo para guardar sector
  peticionPost = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/sectores/", this.state.form)
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a guardado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en el registro del sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo para actualizar sector
  peticionPut = () => {
    axios
      .put(
        "http://127.0.0.1:8000/api/sectores/" + this.state.form.id + "/",
        this.state.form
      )
      .then((response) => {
        this.modalInsertar();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a guardado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en actualizar el sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo en que realiza la peticion para eliminar los datos a la BD mediante la api
  peticionDelete = () => {
    axios
      .delete("http://127.0.0.1:8000/api/sectores/" + this.state.form.id)
      .then((response) => {
        this.setState({ modalEliminar: false });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se a eliminado con exito",
          showConfirmButton: false,
          timer: 2500,
        });
        this.componentDidMount();
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Ocurrio un error en el eliminar el sector",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  //Metodo que funciona para saber que elemento a selecciconado de la tabla y mandarlo al modal
  seleccionSector = (sector) => {
    this.setState({
      tipoModal: "actualizar",
      form: {
        id: sector[0],
        nombre: sector[1],
        descripcion: sector[2],
      },
    });
  };

  //Metodo que sirve para manejar el estado del modal
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  //Metodo que va guardado el estado de lo que digita el usuario en el formulario
  handleChange = async (e) => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Metodo que hace la peticion de consulta a la BD mediante api
  componentDidMount() {
    axios
      .get("http://127.0.0.1:8000/api/sectores/")
      .then((response) => {
        this.setState({ sectores: response.data });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title:
            "Por el momento no hay conexión con la base de datos, intente en otro momento",
        });
      });
  }
  render() {
    const { form } = this.state;
    const columns = [
      {
        name: "id",
        label: "id",
        options: {
          display: "excluded",
        },
      },
      {
        name: "nombre",
        label: "Nombre",
      },
      {
        name: "descripcion",
        label: "Descripcion",
      },
      {
        name: "acciones",
        label: "Acciónes",
        options: {
          print: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <Tooltip title="Editar">
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                      this.seleccionSector(tableMeta.rowData);
                      this.modalInsertar();
                    }}
                  >
                    <Edit></Edit>
                  </Button>
                </Tooltip>
                <span>
                  <Tooltip title="Eliminar">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        this.seleccionSector(tableMeta.rowData);
                        this.setState({ modalEliminar: true });
                      }}
                    >
                      <Delete></Delete>
                    </Button>
                  </Tooltip>
                </span>
              </>
            );
          },
        },
      },
    ];
    return (
      <>
        <div>
          <DataTable
            agregar={
              <Button
                variant="success"
                onClick={() => {
                  this.setState({ form: null, tipoModal: "insertar" });
                  this.modalInsertar();
                }}
              >
                Crear
              </Button>
            }
            titulo="Sectores"
            noRegistro="No hay registro de sectores"
            columnas={columns}
            datos={this.state.sectores}
          />
        </div>

        {/* Modales para creacion o actualizacion*/}
        <Modal isOpen={this.state.modalInsertar} centered className="pt-5">
          <ModalHeader style={{ display: "block" }}>
            {this.state.tipoModal === "insertar" ? (
              <span>Crear sector</span>
            ) : (
              <span>Actualizar sector</span>
            )}
          </ModalHeader>
          <ModalBody>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                id="nombre"
                name="nombre"
                autocomplete="off"
                value={form ? form.nombre : ""}
                required={true}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                id="descripcion"
                name="descripcion"
                autocomplete="off"
                value={form ? form.descripcion : ""}
                required={true}
                onChange={this.handleChange}
              />
            </Form.Group>
            <ModalFooter>
              {this.state.tipoModal === "insertar" ? (
                <Button variant="primary" onClick={() => this.peticionPost()}>
                  Guardar
                </Button>
              ) : (
                <Button variant="primary" onClick={() => this.peticionPut()}>
                  Actualizar
                </Button>
              )}
              <Button variant="secondary" onClick={() => this.modalInsertar()}>
                Cancelar
              </Button>
            </ModalFooter>
          </ModalBody>
        </Modal>

        {/* Modal para eliminar */}
        <Modal isOpen={this.state.modalEliminar} centered>
          <ModalHeader style={{ display: "block" }}>
            <span>Eliminar sector</span>
          </ModalHeader>
          <ModalBody>
            ¿Esta seguro de eliminar el sector seleccionado?
          </ModalBody>
          <ModalFooter>
            <Button variant="danger" onClick={() => this.peticionDelete()}>
              Aceptar
            </Button>
            <Button
              variant="secundary"
              onClick={() => this.setState({ modalEliminar: false })}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Sector;
