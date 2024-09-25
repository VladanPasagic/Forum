import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, put } from "../../services/HttpService";
import { Error } from "../../components/Error";
import { Box, Button, TextField } from "@mui/material";

export const CommentEditPage = (props) => {
  const { id, roomId } = useParams();
  const [comment, setComment] = useState(null);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get(`Comment/${id}`)
      .then((response) => {
        setComment(response);
        setContent(response.content);
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
        setErrorMessage("Error loading comment");
      });
  }, []);

  const handleSubmit = (event) => {
    let url;
    let path;
    if (props.location.pathname.contains("moderator")) {
      url = `Comment/${id}/moderator`;
      path = "/moderator/comments";
    } else {
      (url = `Comment/${id}`), (path = `/forum/${roomId}`);
    }
    event.preventDefault();
    put(url, { content })
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
        setErrorMessage("Error saving comment");
      });
  };

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
        onClose={() => setErrorOpen(false)}
        message={errorMessage}
      ></Error>
      {comment != null && (
        <Box>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: 600 }}
          >
            <TextField
              disabled={true}
              label="Author"
              variant="outlined"
              fullWidth
              margin="normal"
              value={comment.author}
            ></TextField>
            <TextField
              disabled={true}
              label="Room Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={comment.roomTitle}
            ></TextField>
            <TextField
              required
              label="Content"
              variant="outlined"
              fullWidth
              margin="normal"
              value={content}
              onChange={(event) => setContent(event.target.value)}
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
