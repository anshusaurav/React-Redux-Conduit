import React from 'react'
import { Button } from 'semantic-ui-react'
class LikesSection extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {}
  render () {
    const { favorited, favoritesCount } = this.props.article
    const { currentUser } = this.props
    return (
      <section className='article-like-section'>
        {currentUser && favorited && (
          <div className='like-btn-div'>
            <Button
              content={favoritesCount}
              icon='like'
              name='unlike'
              color='red'
              labelPosition='left'
              onClick={this.handleClick}
            />
          </div>
        )}
        {currentUser && !favorited && (
          <div className='like-btn-div'>
            <Button
              content={favoritesCount}
              icon='like'
              name='like'
              color='red'
              labelPosition='left'
              onClick={this.handleClick}
            />
          </div>
        )}
        {!currentUser && (
          <div className='like-btn-div'>
            <Button
              content={favoritesCount}
              icon='like'
              name='onlysee'
              color='red'
              labelPosition='left'
              onClick={this.handleClick}
            />
          </div>
        )}
      </section>
    )
  }
}
export default LikesSection
