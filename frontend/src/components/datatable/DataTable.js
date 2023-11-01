import React from "react";
import MUIDataTable from "mui-datatables";
import { Container, Row, Col } from "react-bootstrap";

export default function DataTable(props) {
  const options = {
    download: "false",
    responsive: "simple",
    selectableRows: "none",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 20, 30],
    tableBodyHeight: "100%",
    tableBodyMaxHeight: "100%",
    textLabels: {
      body: {
        noMatch: props.noRegistro,
        toolTip: "Sort",
        columnHeaderTooltip: (column) => `Ordenar por ${column.label}`,
      },
      pagination: {
        next: "Página siguiente",
        previous: "Página previa",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Búsqueda",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "Ver columnas",
        filterTable: "Filtros de tabla",
      },
      filter: {
        all: "TODOS",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas de tabla",
      },
      selectedRows: {
        text: "fila(s) seleccionada",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    },
  };
  return (
    <Container fluid="xxl">
      <Row>
        <Col sm={2} align="right" className="pt-3">
          <div className="pb-4">{props.agregar}</div>
        </Col>
        <Col sm={10}>
          <MUIDataTable
            id={props.id}
            title={props.titulo}
            data={props.datos}
            columns={props.columnas}
            options={options}
          />
        </Col>
      </Row>
    </Container>
  );
}
