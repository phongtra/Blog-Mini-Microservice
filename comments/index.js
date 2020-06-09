import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ commentId, content });

  commentsByPostId[req.params.id] = comments;
  await axios.post('http://events-srv:4005/events', {
    type: 'Comment Created',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending'
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('Received event: ', event.type);
  if (event.type === 'Comment Moderated') {
    const { postId, id, status, content } = event.data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.commentId === id);
    console.log(comments);
    comment.status = status;
    await axios.post('http://events-srv:4005/events', {
      type: 'Comment Updated',
      data: {
        id,
        content,
        postId,
        status
      }
    });
  }
  res.end();
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
