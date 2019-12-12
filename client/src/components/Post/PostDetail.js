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
        console.log(response.data.match);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getDataPostDetail();
  }

  //=================== register functions

  handleSubmit = event => {
    event.preventDefault();

    const userId = this.props.user._id;
    const postId = this.props.match.params.id;

    axios
      .put(`/post/register/${postId}`, {
        match: this.state.match,
        post: { ...this.state.post, match: userId }
      })
      .then(post => {
        this.setState({
          match: userId,
          post: { ...this.state.post, match: userId }
        });
        this.getDataPostDetail();
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
          match: "",
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };


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
    console.log(Date(this.state.date))


    return (
      <div>
        <div className="postContainer">
          <div className="headerBox">
            <h2>{this.state.title} </h2>
            {!this.state.match ?
              <div></div> :
              this.state.match._id === this.props.user._id ? (<h3> You are registered</h3>) : (<div></div>)}
          </div>

          <div className="infoContainer">
            <div className="item">
              <div className="postLabel">Post type </div>
              <div className="postText">{this.state.postType}</div>
            </div>
            <div className="item">
              <div className="postLabel">category</div>
              <div className="postText">{this.state.category}</div>
            </div>

            <div className="item">
              <div className="postLabel">Date</div>
              <div className="postText"> {""}
                {Math.floor(
                  (new Date(this.state.date).getTime())
                )}</div>
            </div>
            <div className="item">
              <div className="postLabel">Time</div>
              <div className="postText">{this.state.startTime} - {this.state.endTime}</div>
            </div>
          </div>
          {/* <div className="postLabel">description</div> */}
          <div className="postText">{this.state.description}</div>

        </div>

        {this.state.owner._id === this.props.user._id ?
          <>
            <button className="button postDetailButton" onClick={this.deletePost}>
              Delete Post
            </button>
          </>
          :
          !this.state.match ?
            <form onSubmit={this.handleSubmit}>
              <button className="button postDetailButton" type="submit">Register</button>
            </form> :
            this.state.match._id === this.props.user._id ? (
              <div>
                <form onSubmit={this.handleSubmitDeRegister}>
                  <button className="button postDetailButton" type="submit"> Cancel registration</button>
                </form>
              </div>
            ) : (
                <div></div>
              )}
        <div className="posterContainer">
          <p>{this.state.owner.username}</p>
          <p>{this.state.owner.gender}</p>
          <p>{this.state.owner.about}</p>
        </div>



        {!this.state.match ?
          <div></div> :
          this.state.match._id === this.props.user._id ? ( <Message
          subject={this.state.post._id}
          recipient={this.state.post.owner}
          owner={this.props.user}
          {...this.props}
        />) : 
        this.state.owner._id === this.props.user._id ? ( <Message
          subject={this.state.post._id}
          recipient={this.state.post.owner}
          owner={this.props.user}
          {...this.props}
        />) :
        (<div></div> ) }
       
      </div>
    );
  }
}

export default PostDetail;


