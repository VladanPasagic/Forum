import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useEffect } from "react";

export const Error = (props) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => props.onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [props.open, props.onClose]);
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="error-dialog-title"
    >
      <DialogTitle id="error-dialog-title" style={{ color: "#d32f2f" }}>
        Error
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="textPrimary">
          {props.message}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
