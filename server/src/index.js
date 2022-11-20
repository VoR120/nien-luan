const env = require('dotenv')
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

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

app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000, function(){
  console.log("Success")
  // console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});