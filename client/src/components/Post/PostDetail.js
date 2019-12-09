/*import React, {Component} from "react";
import Message from "./Messages"
import { Link } from "react-router-dom"
import axios from "axios";
import "./PostCss/postDetail.css"


const PostDetail = props => {

  //TODO: fetch user and post data in this component
  
  let post = props.postDetail.find( (p) => p._id === props.match.params.id )
  return (
    <div>
      <div key={post._id}>
        <p>{post.title}</p>
        <p>{post.description}</p>
        <p>{post.date}</p>
        <p>{post.startTime}</p>
        <p>{post.endTime}</p>
        <p>{post.postType}</p>
        <p>{post.category}</p>
      </div>

      <Message subject={post._id} recipient={post.owner} owner={props.user} />

          {this.state.match ?
            <div>
              <h2>You are registered</h2>
              <form onSubmit={this.handleSubmitDeRegister}>
          <button type="submit">De-Register</button>
          </form> 
            </div> :
          <form onSubmit={this.handleSubmit}>
          <button type="submit">Register</button>
          </form>  }
          <div className="posterContainer">
          <p>{this.state.owner.username}</p>
          <p>{this.state.owner.gender}</p>
            <p>{this.state.owner.about}</p>
          </div>
      

    </div>
  )
}


//get data from app
//state: title + content of messages 
//to write messages


export default PostDetail;
*/


import React, {Component} from "react";
import Message from "./Messages"
import { Link } from "react-router-dom"
import axios from "axios";
import "./PostCss/postDetail.css"


class PostDetail extends  React.Component {
  state= {
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
    messages: "",

  }

getDataPostDetail = () => {
  
  const id = this.props.match.params.id;
  console.log(id);

   axios
   .get(`/post/${id}`)
   .then(response => {
    console.log(response.data)
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
     messages: response.data.messages, 
 });
 console.log(this.state.post)
   })
   .catch(err => {
     console.log(err);
   })
 }

 handleSubmit = event => {
   event.preventDefault()
   console.log("submit")
   const userId = this.props.user._id
   const postId = this.props.match.params.id;
   console.log(userId)
   console.log(postId)
   axios
   .put(`/post/register/${postId}`, {
     match: this.state.match
   })
   .then(post => {
     this.setState({
       match: userId
     })
   })
   .catch(err => {
     console.log(err);
   })
 }

 handleSubmitDeRegister = event => {
  event.preventDefault()
  console.log("submit")
  const userId = this.props.user._id
  const postId = this.props.match.params.id;
  console.log(userId)
  console.log(postId)
  axios
  .put(`/post/deregister/${postId}`, {
    match: this.state.match
  })
  .then(post => {
    this.setState({
      match: ""
    })
    console.log(this.state)
  })
  .catch(err => {
    console.log(err);
  })
}

 componentDidMount() {
   this.getDataPostDetail();
 }

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

          {this.state.match ?
            <div>
              <h2>You are registered</h2>
              <form onSubmit={this.handleSubmitDeRegister}>
          <button type="submit">De-Register</button>
          </form> 
            </div> :
          <form onSubmit={this.handleSubmit}>
          <button type="submit">Register</button>
          </form>  }
          <div className="posterContainer">
          <p>{this.state.owner.username}</p>
          <p>{this.state.owner.gender}</p>
            <p>{this.state.owner.about}</p>
          </div>
      
<Message subject={this.state.post._id} recipient={this.state.post.owner} owner={this.props.user}/>
    </div>

  ) }
}


//get data from app
//state: title + content of messages 
//to write messages


export default PostDetail;
