import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(res.data);
    };
    fetchComments();
  }, []);
  const renderComments = comments.map((comment) => (
    <li key={comment.commentId}>{comment.content}</li>
  ));
  return <ul>{renderComments}</ul>;
};
