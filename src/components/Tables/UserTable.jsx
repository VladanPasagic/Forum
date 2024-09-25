import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Error } from "../Error";
import { get } from "../../services/HttpService";
import { UserTableEntry } from "./UserTableEntry";
import { Outlet, useNavigate } from "react-router-dom";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("User")
      .then((response) => {
        setUsers(response);
      })
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error loading users");
        setErrorOpen(true);
      });
  }, []);

  return (
    <div style={{ marginTop: "120px" }}>
      <Error
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
        open={errorOpen}
      ></Error>
      <Box margin={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <UserTableEntry key={user.id} user={user}></UserTableEntry>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Outlet></Outlet>
    </div>
  );
};
