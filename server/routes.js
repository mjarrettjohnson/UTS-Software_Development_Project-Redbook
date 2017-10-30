import { Router } from 'express';

import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';
import JournalsController from './controllers/journals.controller';
import EntriesController from './controllers/entries.controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.post('/auth/login', AuthController.login);
routes.post('/auth/register', UsersController.create);

routes.get('/users', accessControl('admin'), UsersController.search);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.get('/users/:username', accessControl('admin'), UsersController._populate, UsersController.fetch);

routes.get('/journals', authenticate, JournalsController.search);
routes.post('/journals', authenticate, JournalsController.create);

routes.get('/journal/:id', authenticate, JournalsController._populate, JournalsController.fetch);

routes.post('/journal/:id/search', authenticate, JournalsController._populate, EntriesController.find);

routes.post('/journal/:id/entry', authenticate, JournalsController._populate, EntriesController.create);

routes.get(
  '/journal/:id/entry/:entryId',
  authenticate,
  JournalsController._populate,
  EntriesController._populate,
  EntriesController.fetch
);
routes.delete(
  '/journal/:id/entry/:entryId',
  authenticate,
  JournalsController._populate,
  EntriesController._populate,
  EntriesController.delete
);
routes.put(
  '/journal/:id/entry/:entryId',
  authenticate,
  JournalsController._populate,
  EntriesController._populate,
  EntriesController.hide
);

routes.patch(
  '/journal/:id/entry/:entryId',
  authenticate,
  JournalsController._populate,
  EntriesController._populate,
  EntriesController.update
);

routes.use(errorHandler);

export default routes;
