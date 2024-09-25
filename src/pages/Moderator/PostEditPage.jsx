import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../../components/Error";
import { Box, Button, TextField } from "@mui/material";
import { CategorySelect } from "../../components/Selects/CategorySelect";
import { get, put } from "../../services/HttpService";

export const PostEditPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if (window.location.pathname.includes("moderator")) {
      url = `Room/${id}/moderator`;
    } else {
      url = `Room/${id}`;
    }
    get(url)
      .then((response) => {
        setRoom(response);
        setDescription(response.description);
        setCategory(response.categoryId);
        setTitle(response.title);
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
        setErrorMessage("Error getting room");
        setErrorOpen(true);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url;
    let path;
    if (window.location.pathname.includes("moderator")) {
      path = "/moderator/posts";
      url = `Room/${id}/moderator`;
    } else {
      path = "forum";
      url = `Room/${id}`;
    }
    put(url, { description, title, categoryId: category })
      .then(() => {
        navigate(path);
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
        setErrorMessage("Error updating room");
      });
  };

  return (
    <div
      style={{
        marginTop: "140px",
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
      {room != null && (
        <Box>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <CategorySelect
              required={true}
              category={category}
              onChange={(category) => setCategory(category)}
            ></CategorySelect>
            <TextField
              required
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            ></TextField>
            <TextField
              required
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></TextField>
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
                Save
              </Button>
            </div>
          </form>
        </Box>
      )}
    </div>
  );
};
