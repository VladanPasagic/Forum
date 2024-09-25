import { Box, Button, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post, patch } from "../services/HttpService";
import { Error } from "../components/Error";
import { getToken, removeJWT } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export const TwoFactorPage = () => {
  const [code, setCode] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMesage] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  async function handleVerify(e) {
    e.preventDefault();
    post(
      `Authentication/2fa`,
      { code },
      { "Content-Type": "application/json", Authorization: getToken() }
    )
      .then(() => {
        auth.set2FA(true);
        navigate("/forum");
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
        setErrorMesage("Error occurred verifying 2fa code");
        removeJWT();
        patch(`Authentication/logout`).then().catch();
      });
  }

  return (
    <Fragment>
      <Error
        message={errorMessage}
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Two-Factor Authentication
        </Typography>
        <form onSubmit={handleVerify}>
          <TextField
            label="Enter 2FA Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Verify
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};
