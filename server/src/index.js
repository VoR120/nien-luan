const env = require('dotenv')
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

env.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cookieParser());
app.use(cors());

// Connect Database
const { connectDB } = require('./configs/db');
connectDB();


// Route
const route = require('./routes/index');
route(app);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running in port', PORT)
})