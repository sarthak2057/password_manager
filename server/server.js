require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/dbCon');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const app = express();

/*
built-in middleware to handle urlencoded data
in other word, form:
'content-type: application/x-www-form-urlencoded'
*/
app.use(express.urlencoded({ extended: false }));
//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/register', require('./routes/register.route'));
app.use('/auth',require('./routes/auth.router'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send(' 404 Not Found');
  }
});

async function startServer() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log('Server is listening on port ' + process.env.PORT);
  });
}

startServer();
