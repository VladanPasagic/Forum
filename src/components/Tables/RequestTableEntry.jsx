import { TableRow, TableCell, Button } from "@mui/material";
import { patch } from "../../services/HttpService";

export const RequestTableEntry = (props) => {
  async function handleApprove(request) {
    patch(`User/${request.id}/approve`)
      .then(() => props.onHandle(request))
      .catch((err) => props.onError(err));
  }

  async function handleDeny(request) {
    patch(`User/${request.id}/deny`)
      .then(() => props.onHandle(request))
      .catch((err) => props.onError(err));
  }

  return (
    <TableRow key={props.request.id}>
      <TableCell>{props.request.name}</TableCell>
      <TableCell>{props.request.email}</TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleApprove(props.request)}
        >
          Approve
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleDeny(props.request)}
        >
          Deny
        </Button>
      </TableCell>
    </TableRow>
  );
};
