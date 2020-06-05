import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();

const posts = {};
app.use(cors());
app.use(bodyParser.json());
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  await axios.post('http://localhost:4005/events', {
    type: 'Post Created',
    data: {
      id,
      title
    }
  });
  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  const event = req.body;
  console.log('Received event: ', event.type);
  res.end();
});

app.listen(4000, () => {
  console.log('Version 50');
  console.log('Listening on 4000');
});
