const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
const clientDir =  path.join(__dirname, 'client');

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: clientDir});
});

app.get('/samesite', (req, res) => {
    const token = Math.random().toString();
    res.cookie('sessionId', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true
    });
    res.sendFile('samesite.html', {root: clientDir});
});

app.get('/samesite/css', (req, res) => {
    console.log('req.cookies', req.cookies);
    res.sendFile('samesite.css', {root: clientDir});
});

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});
