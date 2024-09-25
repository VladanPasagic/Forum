import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, put } from "../services/HttpService";
import { Error } from "../components/Error";
import { Box, Button, TextField } from "@mui/material";
import { RoleSelect } from "../components/Selects/RoleSelect";
import { PermissionList } from "../components/Lists/PermissionList";

export const UserEditPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    get(`User/${id}`)
      .then((response) => {
        setUser(response);
        setUserPermissions(response.permissions);
        if (response.role !== "SuperAdmin") setUserRole(response.role);
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
        setErrorMessage("Error occurred loading user");
      });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(userPermissions);
    put(`User/${id}`, { permissions: userPermissions, role: userRole })
      .then()
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error sending data");
        setErrorOpen(true);
      });
  }

  return (
    <div
      style={{
        marginTop: "120px",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "fit-content",
        contentAlign: "center",
      }}
    >
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      {user != null && (
        <Box>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <TextField
              disabled={true}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.name}
            ></TextField>
            <TextField
              disabled={true}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
            ></TextField>
            {userRole !== "SuperAdmin" && (
              <Fragment>
                <div style={{ marginTop: "20px" }}>
                  <RoleSelect
                    selected={userRole}
                    onChange={(value) => setUserRole(value)}
                  ></RoleSelect>
                </div>
                <PermissionList
                  list={userPermissions}
                  onChange={setUserPermissions}
                ></PermissionList>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidth: "fit-content",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: "20px", width: "200px" }}
                  >
                    Save User
                  </Button>
                </div>
              </Fragment>
            )}
          </form>
        </Box>
      )}
    </div>
  );
};
