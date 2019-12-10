
import React, { Component } from "react"
import { signup } from "../services/auth"
import { Alert, Form, Button} from "react-bootstrap"
import ("./styling/Home.css")


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
      
      <div>
        
      <h3>Create A New Account</h3>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="username">Choose Your Username</Form.Label>
          <Form.Control 
            type= "text"
            name= "username"
            id= "username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password">Choose Your Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </Form.Group>


        <Form.Group>
          <Form.Label htmlFor="age">Birthday</Form.Label>
          <Form.Control
           type="date"
           name="age"
           id="age"
           value={this.state.age}
           onChange={this.handleChange}
          />
        </Form.Group>

        {this.state.error && (
          <Alert variant="danger">{this.state.error}</Alert>
        )}
          <button className="getInvolved" type="submit">Sign up</button>
       </Form>
     </div>
   )}
        }
    

export default Signup;