import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();

app.use(bodyParser.json());

const events = [];
app.post('/events', (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post('http://posts-srv-cluster:4000/events', event);
  axios.post('http://comments-srv-cluster:4001/events', event);
  axios.post('http://query-srv-cluster:4002/events', event);
  axios.post('http://moderation-srv-cluster:4003/events', event);
  res.send({ status: 'ok' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on: 4005');
});
