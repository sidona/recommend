/**
 * Created by sdonose on 7/22/2016.
 */

'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import Candidate from './candidate.model';
var sendEmail = require('../candidates/sendEmail/sendEmail');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

export function indexCandidates(req, res) {
  return Candidate.find().where('job').equals('fara').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Candidates
export function index(req, res) {
  return Candidate.find({'job': {$ne: 'fara'}})
    .populate('job')
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function searchByRecommend(req, res) {
  return Candidate.find({'emailRecommend': req.params.emailRecommend, skill: {$ne: 'intern'}})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function searchByJob(req, res) {
  return Candidate.find({'job': req.params.job})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function searchJob(req, res) {
  return Candidate.find({'job': job})
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function myApplyJob(req, res) {
  return Candidate.find({'emailRecommend': req.params.emailRecommend}).where('skill').equals('intern')
    .populate('job')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Creates a new Candidate in the DB
export function create(req, res) {
  return Candidate.create(req.body)
    .then(function () {
      respondWithResult(res, 201);
      sendEmail.sendEmail(req, res);
    })
    .catch(handleError(res));
}
// Gets a single Candidate from the DB
export function show(req, res) {
  return Candidate.findById(new mongoose.Types.ObjectId(req.params.id))
    .populate('job')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Updates an existing Candidate in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Candidate.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Candidate from the DB
export function destroy(req, res) {
  return Candidate.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
