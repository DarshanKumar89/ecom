'use strict';

var express = require('express');
var controller = require('./systemProperty.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.delete('/:id', controller.destroy);
router.get('/getValueByKey/:key', controller.getValueByKey);
router.post('/updateValueByKey', controller.updateValueByKey);


module.exports = router;
