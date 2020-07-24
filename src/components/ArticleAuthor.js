import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
class ArticleAuthor extends React.Component {
  render() {
    // const article = this.props.article;
    const { updatedAt } = this.props.article;
    const { username, image } = this.props.article.author;
    return (
      <div>
        <Link
          to={`/profiles/${username}`}
          onClick={this.props.fetchProfileData}
        >
          <Card>
            <Card.Content>
              <Image
                floated="left"
                size="mini"
                src={
                  image ||
                  "https://static.productionready.io/images/smiley-cyrus.jpg"
                }
              />
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{new Date(updatedAt).toDateString()}</Card.Meta>
            </Card.Content>
          </Card>
        </Link>
      </div>
    );
  }
}
export default ArticleAuthor;
