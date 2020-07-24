import React from 'react'
import { withRouter } from 'react-router-dom'
import { FullPageFormLoader, FullPageNormalLoader } from './Loader'
import ArticleHero from './ArticleHero'
import ArticleDetails from './ArticleDetails'
import CommentList from './CommentList'
class IndividualArticle extends React.Component {
  constructor (props) {
    super(props)
    this.state = { article: null, comments: null, isUpdated: false }
    this.handleUpdate = this.handleUpdate.bind(this)

    this.handleDelete = this.handleDelete.bind(this)
  }
  async componentDidMount () {
    const path = this.props.history.location.pathname
    const { token } = localStorage
    try {
      let response
      if (token) {
        response = await fetch(
          `https://conduit.productionready.io/api${path}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
      } else {
        response = await fetch(
          `https://conduit.productionready.io/api${path}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
      let data = await response.json()
      if (!data.error) {
        this.setState({ article: data.article })
      }
    } catch (err) {
      console.error('Error:', err)
    }
    try {
      let response
      if (token) {
        response = await fetch(
          `https://conduit.productionready.io/api${path}/comments`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`
            }
          }
        )
      } else {
        response = await fetch(
          `https://conduit.productionready.io/api${path}/comments`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
      let data = await response.json()
      if (!data.error) {
        this.setState({ comments: data.comments })
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  handleUpdate (boolean) {
    this.setState({ isUpdated: boolean })
  }
  handleDelete () {
    this.props.history.push('/')
  }
  async componentDidUpdate (prevProps, prevState) {
    if (this.state.isUpdated !== prevState.isUpdated) {
      console.log('HERE')
      try {
        const path = this.props.history.location.pathname
        const { token } = localStorage
        let response
        if (token) {
          response = await fetch(
            `https://conduit.productionready.io/api${path}/comments`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
              }
            }
          )
        } else {
          response = await fetch(
            `https://conduit.productionready.io/api${path}/comments`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
        }
        let data = await response.json()
        if (!data.error) {
          this.setState({ comments: data.comments })
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  render () {
    const { article, comments } = this.state
    let slug = ''
    if (article) slug = article.slug
    return (
      <div className='article-complete-div'>
        {!article ? (
          <>
            <FullPageNormalLoader />
            <FullPageNormalLoader />
          </>
        ) : (
          <div className='article-div'>
            <ArticleHero
              article={article}
              currentUser={this.props.currentUser}
              handleDelete={this.handleDelete}
            />
            <ArticleDetails article={article} />
          </div>
        )}
        {!comments && !article ? (
          <div>
            <FullPageFormLoader />
          </div>
        ) : (
          <CommentList
            comments={comments}
            slug={slug}
            handleUpdate={this.handleUpdate}
          />
        )}
      </div>
    )
  }
}
export default withRouter(IndividualArticle)
