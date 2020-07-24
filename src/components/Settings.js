import React from 'react'
import { withRouter } from 'react-router-dom'
import { FullPageFormLoader } from './Loader'
import { Form, Button, TextArea, Input,Message } from 'semantic-ui-react'
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      bio: '',
      image: '',
      password: '',
      errorMsgs:null,
      isProfileLoaded: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }
  onChange (event) {
    const { value, name } = event.target;
    console.log(value, name)
    switch (name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'bio':
        this.setState({ bio: value })
        break
      case 'username':
        this.setState({ username: value })
        break
      case 'image':
        this.setState({ image: value })
        break
      case 'password':
        this.setState({ password: value })
        break
      default:
        console.log('We are out of targets.')
    }
  }
  async onSubmit (event) {
    event.preventDefault();
    const {username, email, bio, image, password} = this.state;
    const {token} = localStorage;
    let user;
    if(password) {
      user = {user: {username, email, bio, image, password}};
    }
    else
      user = {user: {username, email, bio, image}};

      try {
        let response = await fetch(
          'https://conduit.productionready.io/api/user',
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`
            },
            body: JSON.stringify(user)
          }
        )
        let data = await response.json();
        console.log(data);
        if (!data.errors) {
          this.props.onUpdate(true);
          
        }else {
          const errors = []
          for (const [key, value] of Object.entries(data.errors)) {
            errors.push(`${key} ${value}`)
          }
          this.setState({ errorMsgs: errors });
        }
      } catch (err) {
        console.error('Error:', err)
      }
    
  }
  onLogOut (event) {
    this.props.isLogged(false)
    this.props.isUpdated(false)
    localStorage.removeItem('token')
  }
  async componentDidMount () {
    const { token } = localStorage
    try {
      let response = await fetch(
        'https://conduit.productionready.io/api/user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`
          }
        }
      )
      let data = await response.json()
      console.log(data)
      if (!data.error) {
        this.setState({ email: data.user.email })
        this.setState({ username: data.user.username })
        this.setState({ bio: data.user.bio })
        this.setState({ image: data.user.image })
        this.setState({isProfileLoaded: true})
      }
    } catch (err) {
      console.error('Error:', err)
    }
  }
  onLogout (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    this.props.history.push('/')
    this.props.onLogout()
  }
  render () {
    const { image, bio, username, email, errorMsgs,isProfileLoaded } = this.state;

    return (
      <>
        {!isProfileLoaded ? (
          <FullPageFormLoader />
        ) : (
          <div>
            <h2>User Settings</h2>
            <Form className='settings-form' onSubmit={this.onSubmit}>
              <Form.Field>
                <Input
                  placeholder='URL of profile picture'
                  name='image'
                  value={image}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <TextArea
                  placeholder='Short bio about you'
                  name='bio'
                  value={bio}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  placeholder='New Password'
                  type='password'
                  name='password'
                  onChange={this.onChange}
                />
              </Form.Field>
              {errorMsgs &&
            errorMsgs.map((msg,index) => <Message key={index} color='red'>{msg}</Message>)}
              <Button type='submit' onClick={this.onSubmit}>Update Settings</Button>
            </Form>
            <div className='settings-form'>
              <Button onClick={this.onLogout}>Logout</Button>
            </div>
          </div>
        )}
      </>
    )
  }
}
//https://conduit.productionready.io/api/user
export default withRouter(Settings)
