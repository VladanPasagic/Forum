import { useEffect, useState } from "react";
import { Error } from "../../components/Error";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get, patch } from "../../services/HttpService";

export const PostApprovalPage = () => {
  const [posts, setPosts] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("Room/unopened")
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
        setErrorMessage("Error loading rooms");
        setErrorOpen(true);
      });
  }, []);

  const handleApprove = (post) => {
    patch(`Room/${post.id}/approve`)
      .then(() => {
        let newPosts = posts.filter((p) => p.id !== post.id);
        setPosts(newPosts);
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
        setErrorMessage("Error approving room");
        setErrorOpen(true);
      });
  };

  const handleDeny = (post) => {
    patch(`Room/${post.id}/deny`)
      .then(() => {
        let newPosts = posts.filter((p) => p.id !== post.id);
        setPosts(newPosts);
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
        setErrorMessage("Error denying room");
        setErrorOpen(true);
      });
  };

  const handleEdit = (post) => {
    navigate(`${post.id}/edit`);
  };

  return (
    <div style={{ marginTop: "120px" }}>
      <Error
        open={errorOpen}
        message={errorMessage}
        onClose={() => setErrorOpen(false)}
      ></Error>
      <Box margin={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.description}</TableCell>
                  <TableCell>{post.createdDate}</TableCell>
                  <TableCell>{post.categoryName}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleApprove(post)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDeny(post)}
                    >
                      Deny
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};
