import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('http://localhost:4000/posts');
      setPosts(res.data);
    };
    fetchPost();
  }, []);
  const renderPosts = Object.values(posts).map((post) => (
    <div
      key={post.id}
      className="card"
      style={{ width: '30%', marginBottom: '20px' }}
    >
      <div className="card-body">
        <CommentList postId={post.id} />
        <h3>{post.title}</h3>
        <CommentCreate postId={post.id} />
      </div>
    </div>
  ));
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPosts}
    </div>
  );
};
