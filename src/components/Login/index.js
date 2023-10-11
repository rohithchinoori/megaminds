// Write your JS code here
import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginError: false,
    errorMsg: '',
    regError: false,
    errorMsg1: '',
  }

  formValidate = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'http://localhost:3001/api/auth/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.showSubmitSuccess(data.token)
    } else {
      this.failureLogin(data.msg)
    }
  }

  getRegister = async () => {
    const {username, password} = this.state
    const details = {username, password}
    console.log(details)
    const url = 'http://localhost:3001/api/auth/register'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(details),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.showSubmitSuccess(data.token)
    } else {
      this.failureRegister(data.msg)
    }
  }

  showSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  failureLogin = msg => {
    this.setState({loginError: true, errorMsg: msg})
  }

  failureRegister = msg => {
    this.setState({regError: true, errorMsg1: msg})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      username,
      password,
      loginError,
      errorMsg,
      regError,
      errorMsg1,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg">
        <h1 className="head">Login to Play</h1>
        <div>
          <form className="card" onSubmit={this.formValidate}>
            <label htmlFor="user" className="input">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input"
              id="user"
              onChange={this.getUsername}
              value={username}
            />
            <label htmlFor="pass" className="input">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input"
              id="pass"
              onChange={this.getPassword}
              value={password}
            />
            <button type="submit" className="but">
              Login
            </button>
            {loginError && <p className="error">*{errorMsg}</p>}
            <p className="l-p">or</p>
            <button type="button" className="but1" onClick={this.getRegister}>
              Register
            </button>
            {regError && <p className="error">*{errorMsg1}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
