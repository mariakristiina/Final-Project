import React from "react";
import { Link } from "react-router-dom";

const PostList = props => {
  return (
    <div className="post-wraper">
      {props.posts.map(post => {
        if (post.match) {
          return (
            <div key={post._id}>
              <h3>
                <Link to={`/post/${post._id}`}>{post.title}</Link> - Matched
              </h3>
              <p>Posted by: {post.owner.username}</p>
              <p>Type: {post.postType}</p>
              <p>Category: {post.category}</p>
              <p>Date: {post.date}</p>
            </div>
          );
        }
        return (
          <div key={post._id} className="posts">
            <div className="singlePosts">
              <h3>
                <Link className="postLinks" to={`/post/${post._id}`}>
                  {post.title}
                </Link>
              </h3>
              <p>Posted by: {post.owner.username}</p>
              <p>Type: {post.postType}</p>
              <p>Category: {post.category}</p>
              <p>Date: {post.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
