import React, { Component } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

class Profile extends Component {
  state = {
    
    error: "",
    profile: "",
    editForm: false,
    username: "",
    urlPath: "https://res.cloudinary.com/mariakristiina/image/upload/v1575542831/avatar-orange_q8rkfz.png",
    age: 0,
    gender: "",
    languages: "",
    about: String
  }

  getData = () => {

    const id = this.props.match.params.id;
    console.log(id);

    axios
      .get(`/profile/${id}`)
      .then(response => {
       
        this.setState({
          profile: response.data,
          username: response.data.username,
          urlPath: response.data.urlPath,
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
      .put(`/profile/${id}`, {
        username: this.state.username,
        age: this.state.age,
        gender: this.state.gender,
        languages: this.state.languages,
        about: this.state.about,
        urlPath:this.state.urlPath
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

  imageUpload = event => {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    let upload = new FormData();
    console.log(upload)
    const id = this.props.match.params.id;

    upload.append("urlPath", file);
    console.log(upload)
    axios.post(`/profile/${id}`, upload)
    .then(response => {
      console.log(response)
      this.setState({
        urlPath: response.data.secure_url
      });
    });
  }

  render() {
    console.log("State", this.state)
    console.log("Props", this.props)

    if (this.state.error) {
      return <p>{this.state.error}</p>;
    } else if (this.state.profile === null) {
      return <div></div>;
    }

    return (
      <div>
        <h2>Hey {this.state.username}</h2>
      <img src={this.state.urlPath} alt="profile"/>
        <p>Age: {this.state.age}</p>
        <p>Gender: {this.state.gender}</p>
        <p>Languages: {this.state.language}</p>
        <p>About: {this.state.about}</p>


        <Button onClick={this.toggleEdit}>Show Edit Form</Button>

        {this.state.editForm && (
          <Form onSubmit={this.handleSubmit} encType="multipart/form-data">

          <Form.Group>
              <Form.Label htmlFor="urlPath">Upload Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="urlPath"
                id="urlPath"
                onChange={this.imageUpload}
              />

            </Form.Group>
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
                type="number"
                name="age"
                id="age"
                value={this.state.age}
                onChange={this.handleChange}
              />
            </Form.Group>

            <label htmlFor="gender">Gender: </label>
            <select onChange={this.handleChange} name="gender" id="gender">
              <option value="diverse">Divers</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

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


            <Button type="submit">Save Profile</Button>
          </Form>

        )}
      </div>
    )

  }

}


export default Profile;