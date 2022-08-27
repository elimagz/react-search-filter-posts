import React, { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  let [input, setInput] = useState([]);
  let [posts, setPosts] = useState([]);
  let [comments, setComments] = useState([]);
  const commentsToPosts = new Map();

  useEffect(() => {
    getPosts();
    getComments();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/comments'
      );
      console.log(response);
      setComments(response.data);
      // console.log(comments);
      // comments.forEach((element) =>
      //   commentsToPosts.set(element.postId, element)
      // );
      // console.log(commentsToPosts.size);
      // commentsToPosts.forEach((value, key) => console.log(value, key));
    } catch (error) {
      console.error(error);
    }
  };

  const search = (event) => {
    setInput(event.target.value.toLowerCase());
  };

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  return (
    <div>
      <input type="text" onChange={debounce(search, 500)} />
      <table>
        <tr>
          <th>userId</th>
          <th>Id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
        {posts
          .filter((post) => post.title.includes(input))
          .map((item) => (
            <tr>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
            </tr>
          ))}
      </table>
      )
    </div>
  );
}
