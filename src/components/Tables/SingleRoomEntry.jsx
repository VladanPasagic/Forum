import {
  Card,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { getId } from "../../services/AuthService";

export const SingleRoomEntry = (props) => {
  const id = getId();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${props.room.id}`);
  };

  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={<Typography variant="h6">{props.room.title}</Typography>}
          secondary={
            <Fragment>
              <Card key={props.room.id} onClick={handleClick}>
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {props.room.description}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Author:{props.room.author}
                </Typography>
                <br />
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.secondary"
                >
                  Published on: {props.room.createdDate}
                </Typography>
              </Card>
              {id === props.room.userId && (
                <Box
                  style={{ position: "absolute", top: "16px", right: "16px" }}
                >
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => props.onEdit(props.room)}
                  >
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="delete"
                    onClick={() => props.onDelete(props.room)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </Box>
              )}
            </Fragment>
          }
        ></ListItemText>
      </ListItem>
    </Fragment>
  );
};
