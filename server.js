import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

// serve static files from 'public' folder in root directory
app.use(express.static('public'));

// serve static files from 'node_modules' folder in root directory
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve static files from 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('something');
  const theMessage = 'Ayyyyy'
  res.render('index.ejs', {data: theMessage});
});

// Any route not defined is 404'ed
app.use('*', (req, res) => {
  return res.status(404).send('404: Page not found- you silly goose');
});

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = 'Uh-oh SpaghettiOs (something went wrong)!';
  const message = error.message || defaultMessage;
  console.log(message);
  return res.status(500).send(message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Use: https://www.exchangerate-api.com/docs/overview
