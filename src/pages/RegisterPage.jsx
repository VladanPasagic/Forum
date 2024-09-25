import React, { Fragment, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { post } from "../services/HttpService";
import { Error } from "../components/Error";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await post("Authentication/register", { username, email, password })
      .then((response) => {
        if (response.success === false) {
          setErrorOpen(true);
          setErrorMessage(response.message);
        } else {
          navigate("/login");
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
        setErrorMessage("Something went wrong");
      });
  }

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login");
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
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></TextField>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};
