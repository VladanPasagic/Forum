import { Fragment } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { PermissionTableEntry } from "./PermissionTableEntry";

export const PermissionTable = (props) => {
  return (
    <Fragment>
      <Box margin={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Request</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.list.map((perm) => (
                <PermissionTableEntry
                  key={perm.id}
                  permission={perm}
                  onDelete={(event) => props.onDelete(event)}
                ></PermissionTableEntry>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fragment>
  );
};
