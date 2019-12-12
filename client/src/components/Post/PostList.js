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
                <Link className="postLinks" to={`/post/${post._id}`}>
          <div key={post._id} className="posts">
            <div className="singlePosts">
              <h3>
                  {post.title}
              </h3>
              <p className="postText">Posted by: {post.owner.username}</p>
              <p className="postText">Type: {post.postType}</p>
              <p className="postText">Category: {post.category}</p>
              <p className="postText">Date: {post.date}</p>
            </div>
          </div>
                </Link>
        );
      })}
    </div>
  );
};

export default PostList;
