import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import routes from './routes';
import Constants from './config/constants';
import jsonErrorHandler from './middleware/jsonErrorHandler';
import cors from 'cors';
const app = express();

app.use(helmet());

if (!Constants.envs.test) {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonErrorHandler());
app.use(methodOverride());

app.use('/', express.static(path.join(__dirname, '../client/build')));
app.use('/public', express.static(path.join(__dirname, '../client')));
app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.use('/img', express.static(path.join(__dirname, '../client/build/img')));
app.use('/node', express.static(path.join(__dirname, '../node_modules')));

app.use(Constants.apiPrefix, routes);

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '../client/build'),
  });
});

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
        Port: ${Constants.port}
        Env: ${Constants.env}
    `);
});

export default app;
