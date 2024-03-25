const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/blogApp', {
    family: 4,
})
.then(() => {
    console.log('Connection to MongoDB successful');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const app = express();
const route = require('./routes.js');

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/post', route);

app.listen(3000, () => console.log('Server is started on port 3000'));
