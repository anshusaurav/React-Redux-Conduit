import React from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
class ProfileHero extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  async handleClick (event) {
    const { name } = event.target;
    const { token } = localStorage;
    const { username } = this.props.profile;
    const url = `https://conduit.productionready.io/api/profiles/${username}/follow`;
    if (name === 'follow') {
      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        })
        let data = await response.json();
        if (!data.error) {
          this.props.handleUpdate()
        }
      } catch (err) {
        console.error('Error:', err)
      }
    }
    else if(name==='unfollow'){
        try {
            let response = await fetch(url, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`
              }
            })
            let data = await response.json()
            // console.log('res ', data)
            if (!data.error) {
              this.props.handleUpdate()
            }
          } catch (err) {
            console.error('Error:', err)
          }
    }
    else if(name==='setting'){
      event.preventDefault();
      this.props.history.push('/settings');
    }
  }
  render () {
    const { username, bio, image, following } = this.props.profile
    const { currentUser } = this.props

    return (
      <section className='profile-hero-section'>
        <div className='profile-picture-div'>
          <img src={image} alt=''></img>
        </div>
        <h3>{username}</h3>
        {bio && <h4>{bio}</h4>}
        {currentUser && currentUser.username === username && (
          <div className='profile-settings-btn-div'>
            <Button
              content='Edit Profile Settings'
              icon='setting'
              name='setting'
              labelPosition='left'
              onClick={this.handleClick}
            />
          </div>
        )}
        {currentUser && currentUser.username !== username && following && (
          <div className='profile-settings-btn-div'>
            <Button
              content='Unfollow'
              icon='remove'
              labelPosition='left'
              name='unfollow'
              color='orange'
              onClick={this.handleClick}
            />
          </div>
        )}
        {currentUser && currentUser.username !== username && !following && (
          <div className='profile-settings-btn-div'>
            <Button
              content='Follow'
              icon='add'
              labelPosition='left'
              color='teal'
              name='follow'
              onClick={this.handleClick}
            />
          </div>
        )}
      </section>
    )
  }
}
export default withRouter(ProfileHero);
