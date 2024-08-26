import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import {currenciesArr, countriesArr} from './currencies.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const API_KEY = process.env.API_KEY;

// global variables
let convertedAmount = undefined;
let leftCurrency = undefined;
let rightCurrency = undefined;
let baseAmount = undefined;

// serve static files from 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// render 'index.ejs' at root endpoint
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currencies: currenciesArr,
    countries: countriesArr,
    baseAmount: baseAmount,
    leftCurrency: leftCurrency,
    rightCurrency: rightCurrency,
    amount: convertedAmount,
  });
});

// make (axios) get request to API and redirect to root endpoint
app.post('/convert', async (req, res) => {
  leftCurrency = req.body.leftCurrency;
  rightCurrency = req.body.rightCurrency;
  baseAmount = req.body.amount;

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${leftCurrency}/${rightCurrency}/${baseAmount}`
    );
    console.log(response.data);
    convertedAmount = response.data.conversion_result;
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
});

// any route not defined is 404'ed
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

// start server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
