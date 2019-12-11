
import React, { Component } from "react"
import { signup } from "../services/auth"
import { Alert, Form, Button} from "react-bootstrap"
import ("./styling/SignupLogin.css")


class Signup extends Component {
  state = {
    username: "",
    password: "",
    age: "",
    error: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
  

  signup(this.state.username, this.state.password,this.state.age, this.props.currentLanguage)
  .then(data => {
    if(data.message) {
      this.setState({
        error: data.message
      })
    } else {
      this.props.setUser(data)
      this.props.history.push("/profile");
    }
  })
  }

  render() {

    return(
      
      <div className="signUpContainer">
        <div>
      <h3 className="formHeader">Create A New Account</h3>
      </div>
      <div className="formContainer">
      <Form onSubmit={this.handleSubmit}>
      <div className="formBox">
        <Form.Group>
          <Form.Label  className="formText" htmlFor="username">Choose Your Username</Form.Label>
          <input className="input"
            type= "text"
            name= "username"
            id= "username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Group>
        </div>

<div className="formBox">
        <Form.Group>
          <Form.Label className="formText" htmlFor="password">Choose Your Password</Form.Label>
          <input className="input"
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>
</div>
<div className="formBox">
        <Form.Group>
          <Form.Label className="formText" htmlFor="age">Birthday</Form.Label>
          <input className="input"
           type="date"
           name="age"
           id="age"
           value={this.state.age}
           onChange={this.handleChange}
          />
        </Form.Group>
</div>
        {this.state.error && (
          <Alert variant="danger">{this.state.error}</Alert>
        )}
          <button className="button signUpLogInButton" type="submit">Sign up</button>
       </Form>
     </div>
     </div>
   )}
        }
    

export default Signup;