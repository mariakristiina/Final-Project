//state: [] ****************DONE

//setState: api call get posts **************DONE

//filter for categories, date, owner, match
import React, { Component } from "react"
import axios from "axios"
import PostList from "./PostList"
import PostForm from "./PostForm"

class Posts extends Component {
  state = {
    posts: []
    editForm
  }

  getData = () => {
    axios
      .get('/post')
      .then(response => {
        console.log(response.data)
        this.setState({
          posts: response.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    return (

      <div className="post-container">
        <PostList posts={this.state.posts} />

        <Button onClick={this.toggleEdit}>Add a new Post</Button>

{this.state.editForm && (
        <PostForm refreshData={this.getData} />
        )}
      </div>
    )
  }
}

export default Posts;

