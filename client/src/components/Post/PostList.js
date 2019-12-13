import React from "react";
import { Link } from "react-router-dom";

const PostList = props => {
  return (
   
        props.posts.map(post => {
        return (
          <Link className="postLinks" to={`/post/${post._id}`}>
            <div key={post._id} className="posts">
              <div className="singlePosts">
                <h3 className="postTitle">{post.title}</h3>
                <p className="postText">Posted by: {post.owner.username}</p>
                <p className="postText">Type: {post.postType}</p>
                <p className="postText">Category: {post.category}</p>
                <p className="postText">Date: {post.date}
                </p>
              </div>
            </div>
          </Link>
        );
      })
  );
};

export default PostList;
