const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: 'http://othersite.local:3001',
  credentials: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/set-cookie/:samesite', (req, res) => {
  const samesite = req.params.samesite;
  const cookieValue = 'Hello from main site!';
  const cookieOptions = {
    sameSite: samesite,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    httpOnly: false,
    domain: 'mainsite.local',
  };
  
  console.log('Setting cookie with options:', cookieOptions);
  
  res.cookie('testCookie', cookieValue, cookieOptions);
  res.json({ message: `Cookie set with SameSite=${samesite}`, cookieValue: cookieValue });
});

app.get('/get-cookie', (req, res) => {
  console.log('Cookies received in /get-cookie:', req.headers.cookie);
  res.json({ cookie: req.headers.cookie || 'No cookie set' });
});

app.get('/check-cookie', (req, res) => {
  console.log('Cookies received in GET /check-cookie:', req.headers.cookie);
  res.json({ cookie: req.headers.cookie || 'No cookie received' });
});

app.post('/check-cookie', (req, res) => {
  console.log('Cookies received in POST /check-cookie:', req.headers.cookie);
  res.json({ cookie: req.headers.cookie || 'No cookie received' });
});

app.get('/iframe-content', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'iframe.html'));
});

app.listen(port, () => {
  console.log(`Main site running at http://localhost:${port}`);
});