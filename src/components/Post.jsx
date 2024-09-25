import { Box, IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getId } from "../services/AuthService";

export const Post = (props) => {
  const id = getId();
  return (
    <Paper style={{ padding: "16px", marginBottom: "16px" }}>
      <Typography variant="body2" color="text.secondary">
        {props.post.publishingDateTime}
      </Typography>
      <Typography variant="h6">{props.post.author}</Typography>
      <Typography variant="body1">{props.post.content}</Typography>
      {id === props.post.userId && (
        <Box style={{ position: "absolute", top: "16px", right: "16px" }}>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => props.onEdit(props.post)}
          >
            <EditIcon></EditIcon>
          </IconButton>
          <IconButton
            color="primary"
            aria-label="delete"
            onClick={() => props.onDelete(props.post)}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};
