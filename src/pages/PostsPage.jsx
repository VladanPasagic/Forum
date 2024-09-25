import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, del } from "../services/HttpService";
import { Error } from "../components/Error";
import { Container, Typography } from "@mui/material";
import { RoomInfo } from "../components/RoomInfo";
import { PostList } from "../components/Lists/PostList";

export const PostsPage = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);

  const navigate = useNavigate();

  const onDelete = (post) => {
    del(`Comment/${post.id}`)
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
        setErrorOpen(true);
        setErrorMessage("Error deleting post");
      });
  };

  const onEdit = (post) => {
    navigate(`posts/${post.id}`);
  };

  useEffect(() => {
    get(`Room/${id}`)
      .then((response) => setRoom(response))
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error fetching room");
        setErrorOpen(true);
      });

    get(`Room/${id}/posts`)
      .then((response) => setPosts(response))
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error fetching posts");
        setErrorOpen(true);
      });
  }, []);

  return (
    <Fragment>
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      {room !== null && (
        <Container style={{ marginTop: "120px" }}>
          <RoomInfo room={room}></RoomInfo>
          <Typography variant="h5" gutterBottom>
            Comments
          </Typography>
          <PostList
            posts={posts}
            onDelete={onDelete}
            onEdit={onEdit}
          ></PostList>
        </Container>
      )}
    </Fragment>
  );
};
