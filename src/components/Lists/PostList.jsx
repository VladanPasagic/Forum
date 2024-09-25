import { Divider, List, ListItem } from "@mui/material";
import { Fragment } from "react";
import { Post } from "../Post";

export const PostList = (props) => {
  return (
    <List>
      {props.posts.map((post) => (
        <Fragment key={post.id}>
          <ListItem>
            <Post
              post={post}
              onEdit={() => props.onEdit(post)}
              onDelete={() => props.onDelete(post)}
            ></Post>
          </ListItem>
          <Divider></Divider>
        </Fragment>
      ))}
    </List>
  );
};
