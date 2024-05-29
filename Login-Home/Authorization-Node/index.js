const express = require('express');
// const cors =require('cors')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();
const CONNECTION_URL = process.env.CONNECTION_URL;
const port = process.env.Port || 5000;

app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/').then(() => console.log("MongoConnect"))
    .catch((error) => console.log(error.message));
    
// app.use('/post',postroutes)


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});