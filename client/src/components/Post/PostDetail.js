import React, {Component} from "react";
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