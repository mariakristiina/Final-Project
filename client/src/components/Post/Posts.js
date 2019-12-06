//state: [] ****************DONE

//setState: api call get posts **************DONE

//filter for categories, date, owner, match
import React, { useEffect } from "react";
import PostForm from "./PostForm"
import { Link } from "react-router-dom";

const Posts = props => {

  useEffect(() => {
    props.getDataPosts()
  }, []);


  return (
    <div className="post-container">
      {props.posts.map(post => {
        console.log(post)
        return (
          <div key={post._id}>
            <h3>
              <Link to={`/post/${post._id}`}>{post.title}
              </Link>
            </h3>
            <p>{post.date}</p>
          </div>
        );
      })}
      {/* <PostForm refreshData={this.getData} /> */}
    </div>
  )
}

export default Posts;

