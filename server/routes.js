/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

module.exports = function(app) {

  // Insert routes below
  app.use('/api/productReviews', require('./api/productReviews'));
  app.use('/api/todaysDeals', require('./api/todaysDeal'));
  app.use('/api/paymentStatus', require('./api/paymentStatus'));
  app.use('/api/orderStatus', require('./api/orderStatus'));
  app.use('/api/paymentTypes', require('./api/paymentType'));
  app.use('/api/autocompleteSearchs', require('./api/autocompleteSearch'));
  app.use('/api/shoppingCart', require('./api/shoppingCart'));
  app.use('/api/orders', require('./api/orders'));
  app.use('/api/products', require('./api/products'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/subCategories', require('./api/subCategory'));
  app.use('/api/categories', require('./api/category'));
  app.use('/api/menus', require('./api/navigationMenu'));
  
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth)/*')
   .get(errors[404]);

};
