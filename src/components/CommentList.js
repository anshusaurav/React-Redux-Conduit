import React from "react";
import { Comment } from "semantic-ui-react";
import CommentSmall from "./CommentSmall";
import { SmallArticleLoader } from "./Loader";
import CommentForm from "./CommentForm";
class CommentList extends React.Component {
  render() {
    const { comments, slug } = this.props;
    return (
      <Comment.Group>
        {!comments ? (
          <SmallArticleLoader />
        ) : (
          comments.map((comment) => {
            return <CommentSmall comment={comment} />;
          })
        )}
        <CommentForm slug={slug} handleUpdate={this.props.handleUpdate} />
      </Comment.Group>
    );
  }
}
export default CommentList;
