const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mt_tahmid:Sadat1234@recipes.ipxnhq1.mongodb.net/recipes?retryWrites=true&w=majority");

app.get('/', (req, res) => {
  res.send('Server is running properly...');
});

app.listen(5000, () => {
  console.log('Listening on the port 5000...');
});