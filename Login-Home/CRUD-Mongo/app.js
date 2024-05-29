const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
