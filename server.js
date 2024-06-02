import express, { response } from 'express';
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

const currenciesArr = [
  'USD',
  'AED',
  'AFN',
  'ALL',
  'AMD',
  'ANG',
  'AOA',
  'ARS',
  'AUD',
  'AWG',
  'AZN',
  'BAM',
  'BBD',
  'BDT',
  'BGN',
  'BHD',
  'BIF',
  'BMD',
  'BND',
  'BOB',
  'BRL',
  'BSD',
  'BTN',
  'BWP',
  'BYN',
  'BZD',
  'CAD',
  'CDF',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CRC',
  'CUP',
  'CVE',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'EGP',
  'ERN',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'FOK',
  'GBP',
  'GEL',
  'GGP',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'GYD',
  'HKD',
  'HNL',
  'HRK',
  'HTG',
  'HUF',
  'IDR',
  'ILS',
  'IMP',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JEP',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KID',
  'KMF',
  'KRW',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MMK',
  'MNT',
  'MOP',
  'MRU',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'NGN',
  'NIO',
  'NOK',
  'NPR',
  'NZD',
  'OMR',
  'PAB',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'QAR',
  'RON',
  'RSD',
  'RUB',
  'RWF',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEK',
  'SGD',
  'SHP',
  'SLE',
  'SLL',
  'SOS',
  'SRD',
  'SSP',
  'STN',
  'SYP',
  'SZL',
  'THB',
  'TJS',
  'TMT',
  'TND',
  'TOP',
  'TRY',
  'TTD',
  'TVD',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'UYU',
  'UZS',
  'VES',
  'VND',
  'VUV',
  'WST',
  'XAF',
  'XCD',
  'XDR',
  'XOF',
  'XPF',
  'YER',
  'ZAR',
  'ZMW',
  'ZWL',
];

app.get('/', async (req, res) => {
  // try {
  //   const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
  //   console.log(response)
  // }

  // catch (error) {
  //   console.log(error)
  // }

  console.dir(currenciesArr, { maxArrayLength: null });
  res.render('index.ejs', { currencies: currenciesArr });
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

/*

-Use: https://www.exchangerate-api.com/docs/overview 

-ISO 4217 Three Letter Currency

*/
