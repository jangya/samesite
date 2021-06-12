const express = require('express');
const path = require('path');
const app = express();
const vhost = require('vhost')
const port = process.env.PORT || 5000;

const clientDir =  path.join(__dirname, 'client');

app.use(require('cookie-parser')());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: clientDir});
});

app.get('/samesite', (req, res) => {
    const token = Math.random().toString();
    res.cookie('test', token, {
        sameSite: 'None',
        httpOnly: true,
        secure: true
    });
    res.sendFile('samesite.html', {root: clientDir});
});

app.get('/samesite/css', (req, res) => {
    console.log('req.cookies', req.cookies['test']);
    const cssFile = req.cookies['test'] ? 'green' : 'red';
    res.sendFile(`${cssFile}.css`, {root: clientDir});
});
if(!process.env.NODE_ENV !== 'production') {
    express().use(vhost('mongohost', app));
}

app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});
