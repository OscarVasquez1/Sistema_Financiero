import React from "react";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Tooltip } from "@material-ui/core";
import { Button } from "react-bootstrap";

export default function botones(props) {
  return (
    <>
      <Tooltip title="Editar">
        <Button size="sm" variant="outline-primary" onClick={props.editar}>
          <Edit></Edit>
        </Button>
      </Tooltip>
      <Tooltip title="Eliminar">
        <Button size="sm" variant="outline-danger" onClick={props.eliminar}>
          <Delete></Delete>
        </Button>
      </Tooltip>
    </>
  );
}
