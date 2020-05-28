import React from 'react';

export default ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;
    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;
      default:
        content = 'This comment is rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <ul>{renderComments}</ul>;
};
