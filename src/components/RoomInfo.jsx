import { Box, Typography } from "@mui/material";

export const RoomInfo = (props) => {
  return (
    <Box margin={3}>
      <Typography variant="h4" gutterBottom>
        {props.room.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Category: {props.room.categoryName}
      </Typography>
      <Typography variant="body1" component="p">
        {props.room.description}
      </Typography>
    </Box>
  );
};
