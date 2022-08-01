const fs = require('fs');
const path = require('path');
const https = require('https');
const helmet = require('helmet');
const express = require('express');

const PORT =3000;

const app = express();

//adding helmet middleware
app.use(helmet());

app.get('/secret',(req,res)=>{
    return res.send('Your secret key is 42!');
}) 

//time stamp microservice
app.get('/api/:time',(req,res)=>{
    let timestamp = req.params.time;
    const responseObj = {};
    if(timestamp.includes('-')){
        responseObj['unix'] = new Date(timestamp).getTime();
        responseObj['utc'] = new Date(timestamp).toUTCString();
    }else{
        timestamp = parseInt(timestamp);
        responseObj['unix'] = new Date(timestamp).getTime();
        responseObj['utc'] = new Date(timestamp).toUTCString();
    }
    res.json(responseObj);
})
app.get('/',(req,res)=>{
    res.send('Hello World');
})

https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem'),
},app).listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`);
})