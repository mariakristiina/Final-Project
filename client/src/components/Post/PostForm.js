// import React, { useEffect } from "react";


// const NewPost = props => {

//   useEffect(() => {
//     props.getDataPosts()
//   }, []);

//   console.log(props);

//   return (
//     <form onSubmit={props.handleSubmitNewPost}>
//       <label htmlFor="title">Title: </label>
//       <input
//         type="text"
//         name="title"
//         id="title"
//         onChange={props.handleChangeNewPost}
//         value={props.newPost.title}
//       />

//       <label htmlFor="date">Date: </label>
//       <input
//         type="date"
//         name="date"
//         id="date"
//         onChange={props.handleChangeNewPost}
//         value={props.newPost.date}
//       />

//       <label htmlFor="startTime">Start Time: </label>
//       <input
//         type="time"
//         name="startTime"
//         id="startTime"
//         onChange={props.handleChangeNewPost}
//         value={props.newPost.startTime}
//       />

//       <label htmlFor="endTime">End Time: </label>
//       <input
//         type="time"
//         name="endTime"
//         id="endTime"
//         onChange={props.handleChangeNewPost}
//         value={props.newPost.endTime}
//       />

//       <label htmlFor="postType">Post Type: </label>
//       <select onChange={props.handleChangeNewPost} name="postType" id="postType">
//         <option value="search">Search</option>
//         <option value="offer">Offer</option>
//       </select>

//       <label htmlFor="category">Category: </label>
//       <select onChange={props.handleChangeNewPost} name="category" id="category">
//         <option value="language lessons">Language Lessons</option>
//         <option value="tutoring">Tutoring</option>
//         <option value="government appointment">Government Appointment</option>
//         <option value="doctor appointment">Doctor appointment</option>
//         <option value="meet people">Meet People</option>
//         <option value="activities for kids">Activities for Kids</option>
//         <option value="activities for seniors">Activities for Seniors</option>
//       </select>

//       <label htmlFor="description">Description: </label>
//       <input
//         type="text"
//         name="description"
//         id="description"
//         onChange={props.handleChangeNewPost}
//         value={props.newPost.description}
//       />
//       <button type="submit">Create a new Post</button>
//     </form>
//   );
// }

// export default NewPost;
