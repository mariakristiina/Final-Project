import React from "react";
import Message from "./Messages";
import axios from "axios";
import "./PostCss/postDetail.css";
import { Button } from "react-bootstrap";

class PostDetail extends React.Component {
  state = {
    post: "",
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    postType: "",
    category: "",
    description: "",
    owner: "",
    match: "",
    messages: ""
  };

  //================= get data

  getDataPostDetail = () => {
    const id = this.props.match.params.id;
    console.log(id);

    axios
      .get(`/post/${id}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          post: response.data,
          title: response.data.title,
          date: response.data.date,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          postType: response.data.postType,
          category: response.data.category,
          description: response.data.description,
          owner: response.data.owner,
          match: response.data.match,
          messages: response.data.messages
        });
        console.log(this.state.post);
      })
      .catch(err => {
        console.log(err);
      });
  };


  //=================== register functions

  handleSubmit = event => {
    event.preventDefault();

    const userId = this.props.user._id;
    const postId = this.props.match.params.id;

    axios
      .put(`/post/register/${postId}`, {
        match: this.state.match
      })
      .then(post => {
        this.setState({
          match: userId
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSubmitDeRegister = event => {
    event.preventDefault();

    const postId = this.props.match.params.id;

    axios
      .put(`/post/deregister/${postId}`, {
        match: this.state.match
      })
      .then(post => {
        this.setState({
          match: ""
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getDataPostDetail();
  }


  //===================== delete post functions

  deletePost = () => {
    const id = this.state.post._id;
    axios
      .delete(`/post/${id}`)
      .then(response => {
        this.props.history.push("/posts"); // 
      })
      .catch(err => {
        console.log(err);
      });
  };


  //============================== render
  render() {

    return (
      <div>
        <div className="postContainer">
          <h2>{this.state.title}</h2>
          <p>{this.state.postType}</p>
          <p>{this.state.category}</p>

          <p>{this.state.date}</p>
          <div className="times">
            <p>from: {this.state.startTime}to: </p>
            <p> {this.state.endTime}</p>
          </div>
          <p>{this.state.description}</p>

        </div>

        {this.state.owner._id === this.props.user._id ?
          <>
            <Button variant="danger" onClick={this.deletePost}>
              Delete Post
            </Button>
          </>
          :
          <div></div>
        }

        {this.state.match ? (
          <div>
            <h2>You are registered</h2>
            <form onSubmit={this.handleSubmitDeRegister}>
              <button type="submit">De-Register</button>
            </form>
          </div>
        ) : (
            <form onSubmit={this.handleSubmit}>
              <button type="submit">Register</button>
            </form>
          )}
        <div className="posterContainer">
          <p>{this.state.owner.username}</p>
          <p>{this.state.owner.gender}</p>
          <p>{this.state.owner.about}</p>
        </div>

        <Message
          subject={this.state.post._id}
          recipient={this.state.post.owner}
          owner={this.props.user}
          {...this.props}
        />
      </div>
    );
  }
}

export default PostDetail;
