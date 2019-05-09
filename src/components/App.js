import React, { Component } from "react";
import axios from "axios";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "../components/Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get(`https://practiceapi.devmountain.com/api/posts`)
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response);
      });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response);
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response);
      });
  }

  // What's better than buried treasure? Pirate's Booty https://piratebrands.com/

  createPost(text) {
    axios
      .post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response);
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map(posts => {
            return (
              <Post
                id={posts.id}
                text={posts.text}
                date={posts.date}
                deletePostFn={this.deletePost}
                updatePostFn={this.updatePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
