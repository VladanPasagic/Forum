import { Fragment, useEffect, useState } from "react";
import { PermissionSelect } from "../Selects/PermissionSelect";
import { Button } from "@mui/material";
import { PermissionTable } from "../Tables/PermissionTable";
import { get } from "../../services/HttpService";
import { Error } from "../Error";
import { useNavigate } from "react-router-dom";

export const PermissionList = (props) => {
  const [permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedPermissions(props.list);
    get("Permission")
      .then((response) => {
        let newPerms = response.filter(
          (obj1) =>
            !props.list.some(
              (obj2) =>
                obj1.categoryId === obj2.categoryId &&
                obj1.requestType === obj2.requestType
            )
        );
        setPermissions(newPerms);
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
        setErrorMessage("Error occurred loading permissions");
        setErrorOpen(true);
      });
  }, []);

  const onPermissionChanged = (value) => {
    setSelectedPermission(value);
  };

  const handleSavePermission = () => {
    if (selectedPermission === "") {
      setErrorMessage("Select a permission");
      setErrorOpen(true);
      return;
    }
    let perm = permissions.filter((p) => p.id === selectedPermission);
    let newPermList = permissions.filter((p) => p.id !== selectedPermission);
    setPermissions(newPermList);
    selectedPermissions.push(perm.pop());
    setSelectedPermissions(selectedPermissions);
    setSelectedPermission("");
    props.onChange(selectedPermissions);
  };

  const handleDeletePermission = (permission) => {
    permissions.push(permission);
    let newPermList = selectedPermissions.filter((p) => p.id !== permission.id);
    setSelectedPermissions(newPermList);
    props.onChange(selectedPermissions);
  };

  return (
    <Fragment>
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <PermissionSelect
        list={permissions}
        permission={selectedPermission}
        onChange={onPermissionChanged}
      ></PermissionSelect>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "fit-content",
        }}
      >
        <Button
          onClick={() => handleSavePermission()}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px", width: "200px" }}
        >
          Add
        </Button>
      </div>
      <PermissionTable
        list={selectedPermissions}
        onDelete={(value) => handleDeletePermission(value)}
      ></PermissionTable>
    </Fragment>
  );
};
