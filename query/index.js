import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'Post Created') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === 'Comment Created') {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }
  console.log(posts);
  res.end();
});

app.listen(4002, () => {
  console.log('Listening on: 4002');
});
