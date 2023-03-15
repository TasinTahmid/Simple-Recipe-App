const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running properly...');
});

app.listen(5000, () => {
  console.log('Listening on the port 5000...');
});