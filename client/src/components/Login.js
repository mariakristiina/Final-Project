import React, { Component } from "react"
import { login } from "../services/auth"
import { Alert, Form, Button } from "react-bootstrap"


class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  componentWillMount() {
    this._isMounted = true;

  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()


    login(this.state.username, this.state.password).then(data => {
      console.log(this.props)
      if (data.message) {
        this.setState({
          error: data.message
        });
      } else {
        this.props.setUser(data)
        console.log(this._isMounted);
        this.props.changeLanguageLogin()
        this.props.history.push("/")
        console.log(this.props.currentLanguage)
        console.log(this.props.user.siteLanguage)
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.error && (
            <Alert variant="danger">{this.state.error}</Alert>
          )}
          <Button type="submit">Log in</Button>

        </Form>
      </div>
    )
  }
}

export default Login;


