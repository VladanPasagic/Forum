import { Fragment, useState } from "react";
import { CategorySelect } from "../components/Selects/CategorySelect";
import { post } from "../services/HttpService";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Error } from "../components/Error";
import { useNavigate } from "react-router-dom";

export const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const navigate = useNavigate();

  const handleSetCategory = (value) => {
    setCategory(value);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    post("Room", {
      categoryId: category,
      content,
      description,
      title,
    })
      .then(()=>
      {
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
        setErrorMessage("Not enough privilege to do that");
      });
  }

  return (
    <Fragment>
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        padding={2}
      >
        <Typography variant="h4" gutterBottom>
          Create a New Post
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 600 }}>
          <CategorySelect
            required={true}
            category={category}
            onChange={handleSetCategory}
          ></CategorySelect>
          <TextField
            required
            label="Post Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            label="Post Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            label="Post Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Submit Post
          </Button>
        </form>
      </Box>
    </Fragment>
  );
};
