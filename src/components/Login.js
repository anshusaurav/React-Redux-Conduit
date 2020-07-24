import React from 'react'
import { Input, Button, Form, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: '', password: '', errorMsgs: null }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onChange (event) {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        this.setState({ email: value })
        break
      case 'password':
        this.setState({ password: value })
        break
      default:
        console.log('We are out of targets.')
    }
  }

  onClickHandler (event) {
    event.preventDefault()
    this.props.history.push('/register')
  }

  async onSubmit (event) {
    event.preventDefault()
    const { email, password } = this.state
    const user = { user: { email, password } }
    console.log(JSON.stringify(user))

    try {
      let response = await fetch(
        'https://conduit.productionready.io/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        }
      )
      let data = await response.json();
      if (!data.errors) {
        this.props.onLogin()
        localStorage.setItem('token', data.user.token)
        this.props.history.push('/')
      } else {
        const errors = []
        for (const [key, value] of Object.entries(data.errors)) {
          errors.push(`${key} ${value}`)
        }
        this.setState({ errorMsgs: errors });
      }
    } catch (err) {
      this.setState({ errorMsg: err })
      console.error('Error:', err)
    }
  }

  render () {
    const { errorMsgs } = this.state;
    return (
      <div className='login-div'>
        <div className='login-div-header'>
          <h2>Sign In</h2>
          <div>
            <Button positive onClick={this.onClickHandler}>
              Have an account?
            </Button>
          </div>
        </div>
        <Form className='login-input-div' onSubmit={this.onSubmit}>
          <Input
            size='large'
            name='email'
            type='email'
            placeholder='email'
            onChange={this.onChange}
          />
          <Input
            size='large'
            name='password'
            type='password'
            placeholder='password'
            onChange={this.onChange}
          />
          {errorMsgs &&
            errorMsgs.map((msg,index) => <Message key={index} color='red'>{msg}</Message>)}
          <div className='login-btn-div'>
            <Button secondary>Sign In</Button>
           
          </div>
        </Form>
      </div>
    )
  }
}
export default withRouter(Login)
