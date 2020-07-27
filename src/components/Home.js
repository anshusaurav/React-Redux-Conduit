import React from "react";

import HeroSection from "./HeroSection";
import AsideTags from "./AsideTags";
import { connect } from "react-redux";
import actions from "./../redux/actions";
import { bindActionCreators } from "redux";

import HomeTabsWithLoader from "./HomeTabsWithLoader";
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { activeIndex: 0 };
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleAddTab = this.handleAddTab.bind(this);
  }
  handleChangeTab(activeIndex) {
    console.log(activeIndex);
    this.setState({ activeIndex: activeIndex });
    // consosle.log)
  }
  handleAddTab() {
    if (this.props.isLoggedIn) {
      this.setState({ activeIndex: 2 });
    } else {
      this.setState({ activeIndex: 1 });
    }
  }

  render() {
    const {
      isLoggedIn,
      tags,
      isTagClicked,
      changeTag,
      selectedTag,
    } = this.props;

    return (
      <div>
        {!isLoggedIn && <HeroSection />}
        <section className="main-section">
          <HomeTabsWithLoader
            isTagClicked={isTagClicked}
            selectedTag={selectedTag}
            handleChangeTab={this.handleChangeTab}
            activeIndex={this.state.activeIndex}
            onUpdate={this.props.onUpdate}
          />
          <AsideTags
            tags={tags}
            changeTag={changeTag}
            handleAddTab={this.handleAddTab}
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("State: ", state);
  console.log(Boolean(state.user.token), state.user.token);
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
/**
 * setting
 */
