import { useEffect, useState } from "react";
import { Error } from "../Error";
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
import { RequestTableEntry } from "./RequestTableEntry";
import { get } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";

export const RequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("User/requests")
      .then((response) => {
        setRequests(response);
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
        setErrorMessage("Error loading requests");
        setErrorOpen(true);
      });
  }, []);

  const setOnError = (event) => {
    if (event === 401) {
      navigate("/logout");
    }
    setErrorMessage("Error occurred " + event);
    setErrorOpen(true);
  };

  const onHandle = (request) => {
    let newRequests = requests.filter((r) => r.id !== request.id);
    setRequests(newRequests);
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <Box margin={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <RequestTableEntry
                  onHandle={onHandle}
                  key={request.id}
                  request={request}
                  onError={setOnError}
                ></RequestTableEntry>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
