import React from "react";
import { Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import actions from "./../redux/actions";
import { bindActionCreators } from "redux";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";
class HomeTabsWithLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalArticles: null,
      feedArticles: null,
      tagArticles: null,
      gACount: 0,
      fACount: 0,
      tACount: 0,
      start: 0,
    };
    this.handlePagination = this.handlePagination.bind(this);
  }
  handleTabChange = (e, { activeIndex }) => {
    this.props.handleChangeTab(activeIndex);
    this.setState({ start: 0 });
  };
  handlePagination(num) {
    this.setState({ start: num * 10 });
  }
  async componentDidMount() {
    const { isTagClicked, selectedTag } = this.props;
    // console.log("isLoggedIn", isLoggedIn);
    const { start } = this.state;
    try {
      const response = await fetch(
        `https://conduit.productionready.io/api/articles?limit=10&offset=${start}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (!data.errors) {
        this.setState({ globalArticles: data.articles });
        this.setState({ gACount: data.articlesCount });
      }
    } catch (err) {
      console.error("Error:", err);
    }
    if (this.props.user.token) {
      try {
        const { token } = localStorage;
        const response = await fetch(
          `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${start}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!data.errors) {
          console.log(data.articles);
          this.setState({ fACount: data.articlesCount });
          this.setState({ feedArticles: data.articles });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
    if (isTagClicked) {
      try {
        const response = await fetch(
          `https://conduit.productionready.io/api/articles?tag=${selectedTag}&limit=10&offset=${start}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (!data.errors) {
          this.setState({ tagArticles: data.articles });
          this.setState({ tACount: data.articlesCount });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  async componentDidUpdate(prevProps, prevState) {
    const { start } = this.state;
    const { selectedTag } = this.props;
    if (
      prevProps.selectedTag !== selectedTag ||
      prevState.start !== start ||
      prevProps.isLoggedIn !== this.props.isLoggedIn
    ) {
      this.setState({ tagArticles: null });
      try {
        const response = await fetch(
          `https://conduit.productionready.io/api/articles?tag=${selectedTag}&limit=10&offset=${start}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.setState({ tagArticles: data.articles });
        this.setState({ tACount: data.articlesCount });
      } catch (err) {
        console.error("Error:", err);
      }

      this.setState({ globalArticles: null });
      try {
        const response = await fetch(
          `https://conduit.productionready.io/api/articles?limit=10&offset=${start}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (!data.errors) {
          this.setState({ globalArticles: data.articles });
          this.setState({ gACount: data.articlesCount });
        }
      } catch (err) {
        console.error("Error:", err);
      }

      this.setState({ feedArticles: null });
      try {
        const { token } = localStorage;
        const response = await fetch(
          `https://conduit.productionready.io/api/articles/feed?limit=10&offset=${start}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!data.errors) {
          this.setState({ fACount: data.articlesCount });
          this.setState({ feedArticles: data.articles });
        }
      } catch (err) {
        console.error("Error:", err);
      }
    }
  }
  render() {
    let panes;
    // console.log("Props:", this.props);
    const { activeIndex } = this.props;
    const {
      isLoading,
      feedArticles,
      globalArticles,
      tagArticles,
      fACount,
      gACount,
      tACount,
    } = this.state;
    const { selectedTag, isLoggedIn, isTagClicked, user } = this.props;
    // console.log(this.props.user);
    if (isLoggedIn) {
      if (isTagClicked) {
        panes = [
          {
            menuItem: "Your Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={feedArticles} currentUser={user} />
                <Pagination
                  totalSize={fACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Global Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={globalArticles} currentUser={user} />
                <Pagination
                  totalSize={gACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: `#${selectedTag}`,
            render: () => (
              <Tab.Pane>
                <ArticleList articles={tagArticles} currentUser={user} />
                <Pagination
                  totalSize={tACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
        ];
      } else {
        panes = [
          {
            menuItem: "Your Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={feedArticles} currentUser={user} />
                <Pagination
                  totalSize={fACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Global Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={globalArticles} currentUser={user} />
                <Pagination
                  totalSize={gACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
        ];
      }
    } else {
      if (isTagClicked) {
        panes = [
          {
            menuItem: "Global Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={globalArticles} />
                <Pagination
                  totalSize={gACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: `#${selectedTag}`,
            render: () => (
              <Tab.Pane>
                <ArticleList articles={tagArticles} />
                <Pagination
                  totalSize={tACount}
                  handlePagination={this.handlePagination}
                />
                <Pagination />
              </Tab.Pane>
            ),
          },
        ];
      } else {
        panes = [
          {
            menuItem: "Global Feed",
            render: () => (
              <Tab.Pane>
                <ArticleList articles={globalArticles} isLoading={isLoading} />
                <Pagination
                  totalSize={gACount}
                  handlePagination={this.handlePagination}
                />
              </Tab.Pane>
            ),
          },
        ];
      }
    }
    return (
      <Tab
        className="tabs-menu"
        activeIndex={activeIndex}
        onTabChange={this.handleTabChange}
        menu={{ pointing: true }}
        panes={panes}
      />
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("State: ", state);
  // console.log(Boolean(state.user.token), state.user.token);
  return {
    isLoggedIn: state.user.token ? true : false,
    user: state.user,
    isUpdated: state.isUpdated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabsWithLoader);
