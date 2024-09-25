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
import { get, patch } from "../../services/HttpService";
import { useNavigate } from "react-router-dom";

export const CommentApprovalPage = () => {
  const [comments, setComments] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    get("Comment/unposted")
      .then((response) => setComments(response))
      .catch((err) => {
        if (err.message == 401) {
          navigate("/logout");
        }
        if (err.message == 403) {
          setErrorMessage("Not enough permissions");
          setErrorOpen(true);
          return;
        }
        setErrorMessage("Error occurred loading comments");
        setErrorOpen(true);
      });
  }, []);

  const handleApprove = (comment) => {
    patch(`Comment/${comment.id}/approve`)
      .then(() => {
        let newComments = comments.filter((p) => p.id !== comment.id);
        setComments(newComments);
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
        setErrorMessage("Error approving comment");
        setErrorOpen(true);
      });
  };

  const handleDeny = (comment) => {
    patch(`Comment/${comment.id}/approve`)
      .then(() => {
        let newComments = comments.filter((p) => p.id !== comment.id);
        setComments(newComments);
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
        setErrorMessage("Error denying comment");
        setErrorOpen(true);
      });
  };

  const handleEdit = (comment) => {
    navigate(`${comment.id}/edit`);
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
                <TableCell>Content</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell>{comment.author}</TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.publishingDateTime}</TableCell>
                  <TableCell>{comment.roomTitle}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleApprove(comment)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleDeny(comment)}
                    >
                      Deny
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(comment)}
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
