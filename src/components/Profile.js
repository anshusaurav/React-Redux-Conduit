import React from 'react'
import ProfileHero from './ProfileHero'
import { withRouter } from 'react-router-dom'
import ProfileArticles from './ProfileArticles'
import { FullPageNormalLoader } from './Loader'
class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = { profile: null, isUpdate: false }
    this.handleUpdate = this.handleUpdate.bind(this)
  }
  handleUpdate () {
    this.setState({ isUpdate: !this.state.isUpdate })
  }

  async componentDidMount () {
    const path = this.props.history.location.pathname
    const usedPath = path.substring(1)
    const index = usedPath.indexOf('/')
    const uName = usedPath.substring(index + 1)
    const { token } = localStorage
    const url = `https://conduit.productionready.io/api/profiles/${uName}`
    
    try {
      let response
      if (token) {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        })
      } else {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      let data = await response.json()
      console.log(data)
      if (!data.error) {
        this.setState({ profile: data.profile })
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  async componentDidUpdate (prevProps, prevState) {
    if (this.state.isUpdate !== prevState.isUpdate) {
      const path = this.props.history.location.pathname
      const usedPath = path.substring(1)
      const index = usedPath.indexOf('/')
      const uName = usedPath.substring(index + 1)
      const { token } = localStorage
      const url = `https://conduit.productionready.io/api/profiles/${uName}`
     
      try {
        let response
        if (token) {
          response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`
            }
          })
        } else {
          response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
        let data = await response.json()
        if (!data.error) {
          this.setState({ profile: data.profile })
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
  }
  render () {
    return (
      <div className='profile-div'>
        {this.state.profile ? (
          <ProfileHero
            currentUser={this.props.currentUser}
            profile={this.state.profile}
            handleUpdate={this.handleUpdate}
          />
        ) : (
          <FullPageNormalLoader />
        )}
        {this.state.profile ? (
          <ProfileArticles
            currentUser={this.props.currentUser}
            profile={this.state.profile}
          />
        ) : (
          <FullPageNormalLoader />
        )}
      </div>
    )
  }
}
export default withRouter(Profile)
