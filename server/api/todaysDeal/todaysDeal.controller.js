/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/todaysDeals              ->  index
 * POST    /api/todaysDeals              ->  create
 * GET     /api/todaysDeals/:id          ->  show
 * PUT     /api/todaysDeals/:id          ->  update
 * DELETE  /api/todaysDeals/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var TodaysDeal = require('./todaysDeal.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of TodaysDeals
exports.index = function(req, res) {
  TodaysDeal.find()
    .populate('product')
    .exec()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single TodaysDeal from the DB
exports.show = function(req, res) {
  TodaysDeal.findById(req.params.id)
    .populate('product')
    .exec()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new TodaysDeal in the DB
exports.create = function(req, res) {
  TodaysDeal.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing TodaysDeal in the DB
exports.update = function(req, res) {
  
  if (req.body._id) {
    delete req.body._id;
  }
  
  TodaysDeal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a TodaysDeal from the DB
exports.destroy = function(req, res) {
  TodaysDeal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
