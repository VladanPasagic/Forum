import { Button, TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";

export const PermissionTableEntry = (props) => {
  return (
    <Fragment>
      <TableRow key={props.permission.id}>
        <TableCell>{props.permission.categoryName}</TableCell>
        <TableCell>{props.permission.requestType}</TableCell>
        <TableCell>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.onDelete(props.permission)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
