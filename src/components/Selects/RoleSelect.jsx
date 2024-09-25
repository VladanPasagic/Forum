import { Fragment, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const RoleSelect = (props) => {
  const [role, setRole] = useState("");

  var roleList = ["Member", "Moderator", "Admin"];

  useEffect(() => {
    setRole(props.selected);
  }, []);

  const handleRoleSelectionChange = (event) => {
    setRole(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <Fragment>
      <Box>
        <div
          style={{ width: "200px", marginLeft: "auto", marginRight: "auto" }}
        >
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              required
              value={role}
              onChange={handleRoleSelectionChange}
              label="Role"
            >
              {roleList.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Fragment>
  );
};
