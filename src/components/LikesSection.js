import React from "react";
import { Button } from "semantic-ui-react";
class LikesSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    console.log(this.props.article);
    const { favorited } = this.props.article;
    console.log("clicked", favorited);
    const url = `https://conduit.productionready.io/api/articles/${this.props.article.slug}/favorite`;

    try {
      let response;
      if (favorited) {
        response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.currentUser.token}`,
          },
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.currentUser.token}`,
          },
        });
      }
      let data = await response.json();
      // console.log(data)
      if (!data.error) {
        // this.setState({ currentUser: data.user });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  render() {
    const { favorited, favoritesCount } = this.props.article;
    const { currentUser } = this.props;
    return (
      <section className="article-like-section">
        {currentUser && favorited && (
          <div className="like-btn-div">
            <Button
              content={favoritesCount}
              icon="like"
              name="unlike"
              color="red"
              labelPosition="left"
              onClick={this.handleClick}
            />
          </div>
        )}
        {currentUser && !favorited && (
          <div className="like-btn-div">
            <Button
              content={favoritesCount}
              icon="like"
              name="like"
              color="black"
              labelPosition="left"
              onClick={this.handleClick}
            />
          </div>
        )}
        {!currentUser && (
          <div className="like-btn-div">
            <Button
              content={favoritesCount}
              icon="like"
              name="onlysee"
              color="red"
              labelPosition="left"
              onClick={this.handleClick}
            />
          </div>
        )}
      </section>
    );
  }
}
export default LikesSection;
