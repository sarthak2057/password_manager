require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbCon');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const app = express();


//Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
//cross-origin resource sharing
app.use(cors(corsOptions));
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
app.use('/auth', require('./routes/auth.router'));
app.use(verifyJWT);
app.use('/manage-password', require('./routes/passwordManager.route'));

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
