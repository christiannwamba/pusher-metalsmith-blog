const express = require('express');
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pusher = new Pusher({
  appId: 'PUSHER-ID',
  key: 'PUSHER-KEY',
  secret: 'PUSHER-SECRET',
  encrypted: true
});

app.post('/comment', (req, res) => {
  console.log(req.body);
  pusher.trigger(req.body.channel, 'new-comment', req.body);
  res.send('Pushed');
})

app.listen(2000, () => console.log('Listening at 2000'));