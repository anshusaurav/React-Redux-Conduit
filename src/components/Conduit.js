import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

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
        isLoggedIn: true,
        isTagClicked: false,
        topTwentyTags: null,
        currentUser: null,
        selectedTag: null,
        homeSelectedTab: 0,
        isUpdated: false,
      };
    } else {
      this.state = {
        isLoggedIn: false,
        isTagClicked: false,
        topTwentyTags: null,
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
      // console.log(data)
      this.setState({ topTwentyTags: data.tags });
    } catch (err) {
      console.error("Error:", err);
    }
    if (this.state.isLoggedIn) {
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
          this.setState({ currentUser: data.user });
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
          this.setState({ currentUser: data.user });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  onUpdate(boolean) {
    console.log("Suny old ");
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
    // console.log(this.state);
    return (
      <Router>
        <div className="container">
          <div className="header-nav">
            <h1>
              <Link to="/">conduit</Link>
            </h1>
            {!this.state.isLoggedIn ? (
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
            ) : this.state.currentUser ? (
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
                    to={`/profiles/${this.state.currentUser.username}`}
                  >
                    {" "}
                    <Icon name="user" size="small" />{" "}
                    {this.state.currentUser.username}
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>
          <Switch>
            <Route exact path="/">
              <Home
                isLoggedIn={this.state.isLoggedIn}
                isTagClicked={this.state.isTagClicked}
                tags={this.state.topTwentyTags}
                changeTag={this.onTagClicked}
                selectedTag={this.state.selectedTag}
                currentUser={this.state.currentUser}
                onUpdate={this.onUpdate}
              />
            </Route>
            <Route path="/login">
              <Login onLogin={this.onLogin} />
            </Route>
            <Route path="/register">
              <Register onLogin={this.onLogin} />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/settings">
              <Settings onLogout={this.onLogout} onUpdate={this.onUpdate} />
            </Route>
            <Route path="/profiles/:username">
              <Profile
                currentUser={this.state.currentUser}
                onUpdate={this.onUpdate}
              />
            </Route>
            <Route path="/articles/:slug">
              <IndividualArticle currentUser={this.state.currentUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Conduit;
