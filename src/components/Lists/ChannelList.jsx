import { Box, Button, List } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { del, get } from "../../services/HttpService";
import { Error } from "../Error";
import { SingleRoomEntry } from "../Tables/SingleRoomEntry";
import { CategorySelect } from "../Selects/CategorySelect";
import { useNavigate } from "react-router-dom";

export const ChannelList = () => {
  const [category, setCategory] = useState("");
  const [rooms, setRooms] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let url;
    if (category.length === 0) url = "Room";
    else url = `Room/category/${category}`;
    get(url)
      .then((response) => setRooms(response))
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error loading rooms");
        setErrorOpen(true);
      });
  }, [category]);

  function handleRemoveFilter(event) {
    event.preventDefault();
    setCategory("");
  }

  function handleCategoryChanged(category) {
    setCategory(category);
  }

  const onEdit = (room) => {
    navigate(`${room.id}/edit`);
  };

  const onDelete = (room)=> {
    del(`Room/${room.id}`)
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
        setErrorMessage("error deleting room");
        setErrorOpen(true);
      });
  }

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Error
          onClose={() => setErrorOpen(false)}
          message={errorMessage}
          open={errorOpen}
        ></Error>
        <CategorySelect
          category={category}
          onChange={handleCategoryChanged}
        ></CategorySelect>
        <Button
          onClick={handleRemoveFilter}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: "20px", width: "200px" }}
        >
          Remove filter
        </Button>
      </Box>
      <List>
        {rooms.map((room) => (
          <SingleRoomEntry
            onEdit={() => onEdit(room)}
            onDelete={onDelete}
            key={room.id}
            room={room}
          ></SingleRoomEntry>
        ))}
      </List>
    </Fragment>
  );
};
