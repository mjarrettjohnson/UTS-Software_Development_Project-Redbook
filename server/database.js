import mongoose from 'mongoose';
import Constants from './config/constants';

mongoose.Promise = global.Promise;

mongoose.connect(Constants.mongo.uri, { useMongoClient: true });
mongoose.connection.on('error', err => {
  throw err;
});
