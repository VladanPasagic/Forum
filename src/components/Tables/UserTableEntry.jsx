import { Button, TableCell, TableRow } from "@mui/material";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export const UserTableEntry = (props) => {
  const navigate = useNavigate();

  async function handleEdit(user) {
    navigate(`${user.id}/edit`);
  }

  return (
    <Fragment>
      <TableRow key={props.user.id}>
        <TableCell>{props.user.name}</TableCell>
        <TableCell>{props.user.email}</TableCell>
        <TableCell>{props.user.role}</TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleEdit(props.user)}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
