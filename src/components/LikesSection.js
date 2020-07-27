import React from "react";
import { Button, Transition } from "semantic-ui-react";
class LikesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false,
      animation: "tada",
      duration: 500,
      visible: true,
      favorited: this.props.article.favorited,
      favoritesCount: this.props.article.favoritesCount,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  toggleVisibility = () =>
    this.setState((prevState) => ({ visible: !prevState.visible }));

  async handleClick() {
    console.log(this.props.article);
    const { favorited } = this.state;
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
        this.setState({ isUpdated: !this.state.isUpdated });
        this.toggleVisibility();
        // this.setState({ currentUser: data.user });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async saveImage() {
    try {
      let response = await fetch(
        `https://conduit.productionready.io/api/articles/${this.props.article.slug}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.currentUser.token}`,
          },
        }
      );
      let data = await response.json();
      // console.log(data)
      if (!data.error) {
        this.setState({
          favorited: data.article.favorited,
          favoritesCount: data.article.favoritesCount,
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async componentDidMount() {
    this.saveImage();
  }
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.isUpdated !== prevState.isUpdated) {
      this.saveImage();
    }
  }
  render() {
    const {
      favorited,
      favoritesCount,
      animation,
      duration,
      visible,
    } = this.state;
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
              color="black"
              labelPosition="left"
            />
          </div>
        )}
      </section>
    );
  }
}
export default LikesSection;
