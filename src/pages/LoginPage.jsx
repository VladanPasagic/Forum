import React, { Fragment, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Error } from "../components/Error";
import { post } from "../services/HttpService";
import { addJWT } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const auth = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    post("Authentication/login", { username, password })
      .then((response) => {
        if (response.success === false) {
          setErrorOpen(true);
          setErrorMessage(response.message);
        } else {
          addJWT(response.token);
          auth.login();
          navigate("/twofactor");
        }
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
        setErrorOpen(true);
        setErrorMessage("An error occurred trying to log you in");
      });
  }

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <Fragment>
      <Error
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
      ></Error>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};
