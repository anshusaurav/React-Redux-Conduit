import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import { connect } from "react-redux";
import actions from "./../redux/actions";
import { bindActionCreators } from "redux";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Editor from "./Editor";
import Settings from "./Settings";
import Profile from "./Profile";
import { Icon } from "semantic-ui-react";
import IndividualArticle from "./IndividualArticle";
class Conduit extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.token) {
      this.state = {
        // isLoggedIn: true,
        isTagClicked: false,
        // topTwentyTags: null,
        selectedTag: null,
        homeSelectedTab: 0,
        isUpdated: false,
      };
    } else {
      this.state = {
        // isLoggedIn: false,
        isTagClicked: false,
        // topTwentyTags: null,
        currentUser: null,
        selectedTag: null,
        homeSelectedTab: 0,
        isUpdated: false,
      };
    }
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onTagClicked = this.onTagClicked.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  async componentDidMount() {
    try {
      const response = await fetch(
        "https://conduit.productionready.io/api/tags",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      // console.log("TAGS", data);
      this.props.actions.fetchTags(data.tags);
    } catch (err) {
      console.error("Error:", err);
    }
    if (localStorage.token) {
      const { token } = localStorage;
      try {
        let response = await fetch(
          "https://conduit.productionready.io/api/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        let data = await response.json();
        // console.log(data)
        if (!data.error) {
          // console.log("DATA USER");
          // console.log(data.user);
          this.props.actions.fetchUser(data.user);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.isUpdated !== this.state.isUpdated) {
      const { token } = localStorage;
      try {
        let response = await fetch(
          "https://conduit.productionready.io/api/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        let data = await response.json();
        // console.log(data)
        if (!data.error) {
          this.props.actions.fetchUser(data.user);
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  onUpdate(boolean) {
    this.setState({ isUpdated: boolean });
  }

  onLogin(user) {
    this.setState({ isLoggedIn: true });
  }
  onLogout() {
    this.setState({ isLoggedIn: false });
    this.setState({ currentUser: null });
  }

  onTagClicked(newTag) {
    this.setState({ selectedTag: newTag }, function () {
      this.setState({ isTagClicked: true }, function () {
        console.log(this.state.selectedTag);
      });
    });
  }

  render() {
    console.log(this.props.isLoggedIn);
    return (
      <Router>
        <div className="container">
          <div className="header-nav">
            <h1>
              <Link to="/">conduit</Link>
            </h1>
            {!localStorage.token ? (
              <ul>
                <li>
                  <NavLink activeClassName="nav-active" to="/" exact={true}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="nav-active" to="/login">
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="nav-active" to="/register">
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink activeClassName="nav-active" to="/" exact={true}>
                    <Icon name="home" size="small" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="nav-active" to="/editor">
                    <Icon name="write" size="small" />
                    New Post
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="nav-active" to="/settings">
                    <Icon name="setting" size="small" />
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    activeClassName="nav-active"
                    to={`/profiles/${this.props.user.username}`}
                  >
                    {" "}
                    <Icon name="user" size="small" /> {this.props.user.username}
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <Switch>
            <Route exact path="/">
              <Home
                isTagClicked={this.state.isTagClicked}
                tags={this.props.tags}
                changeTag={this.onTagClicked}
                selectedTag={this.state.selectedTag}
                onUpdate={this.onUpdate}
              />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/settings">
              <Settings onUpdate={this.onUpdate} />
            </Route>
            <Route path="/profiles/:username">
              <Profile currentUser={this.props.user} onUpdate={this.onUpdate} />
            </Route>
            <Route path="/articles/:slug">
              <IndividualArticle currentUser={this.props.user} />
            </Route>
          </Switch>
        </div>
      </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(Conduit);
