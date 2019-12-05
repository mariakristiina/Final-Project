import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class Profile extends Component {
  state = {
    error: "",
    profile: null,
    editForm: false,
    username: "",
    image: "",
    age: null,
    gender: "",
    languages: "",
    about: String
  }

  getData = () => {

    const id = this.props.match.params.id;

    axios
      .get(`/auth/${id}`)
      .then(response => {
        this.setState({
          profile: response.data,
          username: response.data.username,
          image: response.data.image,
          age: response.data.age,
          gender: response.data.gender,
          languages: response.data.languages,
          about: response.data.about
        });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.setState({
            error: err.response.data.message
          });
        }
      })
  };

  componentDidMount() {
    this.getData();
  }

  toggleEdit = () => {
    this.setState({
      editForm: !this.state.editForm
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const id = this.props.match.params.id;

    axios
      .put(`/auth/${id}`, {
        username: this.state.username,
        image: this.state.image,
        age: this.state.age,
        gender: this.state.gender,
        languages: this.state.languages,
        about: this.state.about
      })
      .then(response => {
        this.setState({
          profile: response.data,
          editForm: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.profile === null) {
      return <div></div>;
    }

    let canUpdate = false;

    if (this.state.profile.owner === this.props.user._id) {
      canUpdate = true
    }

    return (
      <div>
        <h1>{this.state.profile.username}</h1>
        <img src={this.state.profile.image} alt="" />
        <p>{this.state.profile.age}</p>
        <p>{this.state.profile.gender}</p>
        <p>{this.state.profile.languages}</p>
        <p>{this.state.profile.about}</p>

        {canUpdate && (
          <>
            <Button onClick={this.toggleEdit}>Edit profile</Button>
          </>
        )}

        {this.state.editForm && (
          <Form onSubmit={this.handleSubmit}>
            <h2>Edit profile</h2>
            <Form.Group>
              <Form.Label htmlFor="username">username: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="age">age: </Form.Label>
              <Form.Control
                type="text"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </Form.Group>


            <Form.Group>
              <Form.Label htmlFor="gender">gender: </Form.Label>
              <Form.Control
                type="text"
                name="gender"
                id="gender"
                value={this.state.gender}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="languages">languages: </Form.Label>
              <Form.Control
                type="text"
                name="languages"
                id="languages"
                value={this.state.languages}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="about">about: </Form.Label>
              <Form.Control
                type="text"
                name="about"
                id="about"
                value={this.state.about}
                onChange={this.handleChange}
              />
            </Form.Group>



            <Button type="submit">Save</Button>
          </Form>
        )}

      </div>

    )

  }

}


export default Profile;