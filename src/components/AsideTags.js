import React from "react";
import { Button } from "semantic-ui-react";
import { TagsLoader } from "./Loader";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import actions from "./../redux/actions";
class TagsAside extends React.Component {
  constructor(props) {
    super(props);
    this.onClickTag = this.onClickTag.bind(this);
  }
  static get COLORLIST() {
    return [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "violet",
      "purple",
      "pink",
      "brown",
    ];
  }
  onClickTag(event) {
    if (this.props.isLoggedIn) {
      this.props.changeTag(event.target.textContent);
      this.props.handleAddTab();
    } else {
      this.props.history.push("/login");
    }
  }
  Loaders = () => {
    let arr = new Array(5).fill(1);
    return arr.map((elem, index) => <TagsLoader key={index} />);
  };
  render() {
    console.log(this.props);
    const { tags } = this.props;
    console.log(Boolean(tags));
    return (
      <aside className="tags-section">
        <div className="tags-inner-div">
          {!tags
            ? this.Loaders()
            : tags.map((elem, index) => {
                return (
                  <Button
                    className="tag-btn"
                    basic
                    color={
                      TagsAside.COLORLIST[index % TagsAside.COLORLIST.length]
                    }
                    content={elem}
                    key={index}
                    onClick={this.onClickTag}
                  />
                );
              })}
        </div>
      </aside>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("TAGS: ", state.tags);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TagsAside));
