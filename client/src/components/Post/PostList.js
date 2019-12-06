import React from "react";
import { Link } from "react-router-dom";

const PostList = props => {
  return (
    <div>
      {props.posts.map(post => {
        console.log(post)
        return (
          <div key={post._id}>
            <h3>
              <Link to={`/post/${post._id}`}>{post.title}
              </Link>
              
            </h3>
            <p>User: {post.owner.username}</p>
            <p>Date: {post.date}</p>
            <p>Type: {post.postType}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;