import { Fragment, useEffect, useState } from "react";
import { get } from "../../services/HttpService";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Error } from "../Error";
import { useNavigate } from "react-router-dom";

export const CategorySelect = (props) => {
  const [categoryList, setCategoryList] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("Category")
      .then((response) => {
        setCategoryList(response);
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
        setErrorMessage("error loading categories");
        setErrorOpen(true);
      });
  }, []);

  const handleCategorySelectionChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <Fragment>
      <Error
        message={errorMessage}
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <Box>
        <div
          style={{ width: "200px", marginLeft: "auto", marginRight: "auto" }}
        >
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              required={props.required ?? false}
              value={props.category}
              onChange={handleCategorySelectionChange}
              label="Category"
            >
              {categoryList.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </Fragment>
  );
};
