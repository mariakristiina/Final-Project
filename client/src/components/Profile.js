import React from "react";
import { Button, Form } from "react-bootstrap";

const Profile = props => {


  return (
    // if (this.state.error) {
    //   return <p>{this.state.error}</p>;
    // } else if (this.state.profile === null) {
    //   return <div></div>;
    // }

    <div>
      <h2>Hey {props.profile.username}</h2>
      <img src={props.profile.urlPath} alt="profile" />
      <p>
        Age:{" "}
        {Math.floor(
          (new Date() - new Date(props.profile.age).getTime()) / 3.15576e10
        )}
      </p>
      <p>Gender: {props.profile.gender}</p>
      <p>Languages: {props.profile.languages}</p>
      <p>About: {props.profile.about}</p>

      <Button onClick={props.toggleEditProfile}>Show Edit Form</Button>
      {console.log(props.editProfileForm)}
      {props.editProfileForm && (
        <Form
          onSubmit={props.handleSubmitProfile}
          encType="multipart/form-data"
        >
          <Form.Group>
            <Form.Label htmlFor="urlPath">Upload Profile Picture</Form.Label>
            <Form.Control
              type="file"
              name="urlPath"
              id="urlPath"
              onChange={props.imageUpload}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="username">username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              value={props.profile.username}
              onChange={props.handleChangeProfile}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="age">age: </Form.Label>
            <Form.Control
              type="date"
              name="age"
              id="age"
              value={props.profile.age}
              onChange={props.handleChangeProfile}
            />
          </Form.Group>

          <label htmlFor="gender">Gender: </label>
          <select
            onChange={props.handleChangeProfile}
            name="gender"
            id="gender"
          >
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
              value={props.profile.languages}
              onChange={props.handleChangeProfile}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="about">about: </Form.Label>
            <Form.Control
              type="text"
              name="about"
              id="about"
              value={props.profile.about}
              onChange={props.handleChangeProfile}
            />
          </Form.Group>

          <Button type="submit">Save Profile</Button>
        </Form>
      )}
    </div>
  );
};

export default Profile;