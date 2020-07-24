import React from "react";
import { Comment } from "semantic-ui-react";
class CommentSmall extends React.Component {
  render() {
    const { author, body, createdAt } = this.props.comment;
    const { username, image } = author;
    console.log(username, image);
    return (
      <Comment>
        <Comment.Avatar as="a" src={image} />
        <Comment.Content>
          <Comment.Author>{username}</Comment.Author>
          <Comment.Metadata>
            <div>{new Date(createdAt).toDateString()}</div>
          </Comment.Metadata>
          <Comment.Text>{body}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}
export default CommentSmall;
/*
author:
bio: "Fun loving guy with many dog freinds"
following: false
image: "https://avatars1.githubusercontent.com/u/11404667?s=460&u=869c309379e8be4b2ce089693e5bcdaa37f602cf&v=4"
username: "Chinnodu"
__proto__: Object
body: "huhuhuh"
createdAt: "2020-06-25T12:46:51.306Z"
*/
