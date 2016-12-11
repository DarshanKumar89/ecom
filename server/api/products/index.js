'use strict';

var express = require('express');
var controller = require('./products.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.get('/searchProducts/:text', controller.searchProducts);
router.get('/searchProductsByCategory/:text', controller.searchProductsByCategory);
router.get('/searchProductsByDepartment/:text', controller.searchProductsByDepartment);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/uploadProducts/', controller.uploadCsv);

module.exports = router;
