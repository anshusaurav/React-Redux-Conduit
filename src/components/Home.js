import React from 'react'

import HeroSection from './HeroSection'
import AsideTags from './AsideTags'

import HomeTabsWithLoader from './HomeTabsWithLoader'
class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = { activeIndex: 0 }
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleAddTab = this.handleAddTab.bind(this);
  }
  handleChangeTab(activeIndex){
    console.log(activeIndex);
    this.setState({activeIndex : activeIndex});
    // consosle.log)
  }
  handleAddTab(){
    if(this.props.isLoggedIn) {
      this.setState({activeIndex: 2});
    }
    else {
      this.setState({activeIndex: 1});
    }
  }
  
  render () {
    const { isLoggedIn, tags, isTagClicked, changeTag, selectedTag } = this.props;
    
    return (
      <div>
        {!isLoggedIn && <HeroSection />}
        <section className='main-section'>
          <HomeTabsWithLoader
            isLoggedIn={isLoggedIn}
            isTagClicked={isTagClicked}
            selectedTag = {selectedTag}
            handleChangeTab = {this.handleChangeTab}
            activeIndex = {this.state.activeIndex}
            currentUser = {this.props.currentUser}
            onUpdate={this.props.onUpdate}
          />
          <AsideTags tags={tags} changeTag={changeTag} handleAddTab = {this.handleAddTab} />
        </section>
      </div>
    )
  }
}
export default Home
/**
 * setting
 */
