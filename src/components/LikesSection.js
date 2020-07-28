import React from "react";
import { Button } from "semantic-ui-react";

import { connect } from "react-redux";
import actions from "./../redux/actions";
import { bindActionCreators } from "redux";
class LikesSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false,

      favorited: this.props.article.favorited,
      favoritesCount: this.props.article.favoritesCount,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    // console.log(this.props.article);
    const { favorited } = this.state;
    const url = `https://conduit.productionready.io/api/articles/${this.props.article.slug}/favorite`;

    try {
      let response;
      const { token } = localStorage;
      if (favorited) {
        response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
      }
      let data = await response.json();
      // console.log(data)
      if (!data.error) {
        this.setState({ isUpdated: !this.state.isUpdated });
        // this.toggleVisibility();
        // this.setState({ currentUser: data.user });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
  async saveImage() {
    try {
      const { token } = localStorage;
      const response = await fetch(
        `https://conduit.productionready.io/api/articles/${this.props.article.slug}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      const data = await response.json();
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
    const { favorited, favoritesCount } = this.state;
    const { user } = this.props;

    return (
      <section className="article-like-section">
        {user && favorited && (
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
        {user && !favorited && (
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
        {!user && (
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
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.token ? true : false,
    user: state.user,
    isUpdated: state.isUpdated,
    tags: state.tags,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikesSection);
