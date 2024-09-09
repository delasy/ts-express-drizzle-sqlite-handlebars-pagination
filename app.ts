import 'dotenv/config';

import bodyParser from 'body-parser';
import crypto from 'node:crypto';
import { engine } from 'express-handlebars';
import express, { type Response } from 'express';
import helmet from 'helmet';
import { client } from './db';
import * as mutations from './db/mutations';
import * as queries from './db/queries';
import routes from './routes';

const app = express();
const port = process.env.PORT ?? '8080';

app.engine('hbs', engine({ extname: '.hbs' }));
app.set('mutations', mutations);
app.set('queries', queries);
app.set('trust proxy', 1);
app.set('view engine', 'hbs');

app.use((_, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", (_, res) => `'nonce-${(res as Response).locals.cspNonce}'`],
      },
    },
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.info(`Listening on port ${port}`);
});

process.on('SIGINT', () => {
  client.close();
});
