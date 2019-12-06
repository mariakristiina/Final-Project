import React from "react";
import Message from "./Messages";


const PostDetail = props => {
  console.log(props)
  return (
    <div>
      {props.postDetail.map(post => {
        return (
          <div key={post._id}>
            <p>{post.title}</p>
            <p>{post.description}</p>
            <p>{post.date}</p>
            <p>{post.startTime}</p>
            <p>{post.endTime}</p>
            <p>{post.postType}</p>
            <p>{post.category}</p>
          </div>
        )
      })}
      <Message />
    </div>

  )
}

//get data from app
//state: title + content of messages 
//to write messages


export default PostDetail;