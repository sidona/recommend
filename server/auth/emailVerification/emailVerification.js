/**
 * Created by sdonose on 10/7/2016.
 */
var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import express from 'express';
var router = express.Router();

import User from '../../api/user/user.model';

var model = {
  verifyUrl: 'http://localhost:9000/auth/verifyEmail?token=',
  title: 'psJwt',
  subTitle: 'Thanks for signing up!',
  body: 'Please verify your email address by clicking the button below'
};

exports.send = function (email) {
  var payload = {
    sub: email
  };

  var token = jwt.encode(payload, 'recomnode-secret');


  var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.pentalog.fr',
    port: 587,
    auth: {

    }
  }));

  var mailOptions = {
    from: '<sdonose@pentalog.fr>',
    to: email,
    subject: 'Verificare cont',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) return console.log(err);

    console.log('email sent ', info.response);
  })
};

exports.handler = function (req, res) {
  var token = req.query.token;

  var payload = jwt.decode(token, 'recomnode-secret');

  var email = payload.sub;

  if (!email) return handleError(res);

  User.findOne({
    email: email
  }, function (err, foundUser) {
    if (err) return res.status(500);

    if (!foundUser) return handleError(res);

    if (!foundUser.active)
      foundUser.active = true;

    foundUser.save(function (err) {
      if (err) return res.status(500);

      return res.redirect('http://localhost:9000');
    })
  })
};

function getHtml(token) {
  var path = 'server/views/emailVerification.html';
  var html = fs.readFileSync(path, 'utf8');

  var template = _.template(html);

  model.verifyUrl += token;

  return template(model);
}

function handleError(res) {
  return res.status(401).send({
    message: 'Authentication failed, unable to verify email'
  });
}
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
 export default router;
