import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import PlaceCtrl from './controllers/place';
import Cat from './models/cat';
import Place from './models/place';
import User from './models/user';

export default function setRoutes(app) {

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();
  const placeCtrl = new PlaceCtrl();

  // Cats
  app.route('/api/cats').get(catCtrl.getAll);
  app.route('/api/cats/count').get(catCtrl.count);
  app.route('/api/cat').post(catCtrl.insert);
  app.route('/api/cat/:id').get(catCtrl.get);
  app.route('/api/cat/:id').put(catCtrl.update);
  app.route('/api/cat/:id').delete(catCtrl.delete);

  // Users
  app.route('/api/login').post(userCtrl.login);
  app.route('/api/users').get(userCtrl.getAll);
  app.route('/api/users/count').get(userCtrl.count);
  app.route('/api/user').post(userCtrl.insert);
  app.route('/api/user/:id').get(userCtrl.get);
  app.route('/api/user/:id').put(userCtrl.update);
  app.route('/api/user/:id').delete(userCtrl.delete);

  // Places
  app.route('/api/places').get(placeCtrl.getAll);
  app.route('/api/place/count').get(placeCtrl.count);
  app.route('/api/place').post(placeCtrl.insert);
  app.route('/api/place/:id').get(placeCtrl.get);
  app.route('/api/place/:id').put(placeCtrl.update);
  app.route('/api/place/:id').delete(placeCtrl.delete);

}
