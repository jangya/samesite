const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(cors({
  origin: 'https://samesite-sooty.vercel.app/',
  credentials: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/check-cookie', (req, res) => {
  console.log('Cookies received in GET /check-cookie:', req.headers.cookie);
  res.json({ cookie: req.headers.cookie || 'No cookie received' });
});

app.post('/check-cookie', (req, res) => {
  console.log('Cookies received in POST /check-cookie:', req.headers.cookie);
  res.json({ cookie: req.headers.cookie || 'No cookie received' });
});

app.listen(port, () => {
  console.log(`Other site running at https://samesite-other.vercel.app/:${port}`);
});