import { div, mult, sum } from '@gamatec/g-calc';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import config from './config';
import logger from './logger';
import expressErrorLogger from './logger/express/error';
// import expressLogger from './logger/express/normal';

require('dotenv').config();

const app = express();

app.set('env', config.env);

// Cors
app.use(cors((req, callback) => {
  callback(null, { origin: config.express.corsWhitelist.indexOf(req.header('Origin')) !== -1 });
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(expressLogger);

const router = express.Router();

// router.use(express.static('app/public'));

// testes - remover vv
router.get('/', async (req, res) => {
  // (3 / 5) * (6 + 7)
  let profiler = logger.startTimer();
  const promise1 = div(3, 5);
  const promise2 = sum(6, 7);
  const [r1, r2] = await Promise.all([promise1, promise2]); // Espera aqui (await)
  let result = await mult(r1, r2); // Espera aqui (await)
  // Total 2 segundos
  profiler.done({ message: 'Rodando em paralelo' });

  profiler = logger.startTimer();
  const r3 = await div(3, 5); // Espera aqui (await)
  const r4 = await sum(6, 7); // Espera aqui (await)
  result = await mult(r3, r4); // Espera aqui (await)
  // Total 3 segundos
  profiler.done({ message: 'Rodando sequencial' });

  res.json({ resultado: result });
});

router.get('/error', async (req, res, next) => {
  next(new Error('E agora, quem poderá nos defender?'));
});

app.use('/', router);
app.use(expressErrorLogger);

export default app;
