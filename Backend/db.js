const mongoose = require('mongoose');

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

module.exports = mongoose;
