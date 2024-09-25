import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment } from "react";

export const PermissionSelect = (props) => {
  return (
    <Fragment>
      <Box>
        <div
          style={{
            width: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Permission</InputLabel>
            <Select
              value={props.permission}
              onChange={(event) => props.onChange(event.target.value)}
              label="Permission"
            >
              {props.list.map((perm) => (
                <MenuItem key={perm.id} value={perm.id}>
                  {perm.categoryName} {perm.requestType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Fragment>
  );
};
