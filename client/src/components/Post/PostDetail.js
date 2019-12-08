import React from "react";
import Message from "./Messages"
//import { Link } from "react-router-dom"


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

    </div>
  )
}

//get data from app
//state: title + content of messages 
//to write messages


export default PostDetail;