/**
 * Created by sdonose on 10/7/2016.
 */
var _ = require('underscore');
var fs = require('fs');
//var jwt = require('jwt-simple');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import express from 'express';
var router = express.Router();

import User from '../../api/user/user.model';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

var model = {
  verifyUrl: '',
  title: 'Activare cont OpporTube',
  body: 'Pentru activarea contului, vă rugăm apăsați '
};

exports.send = function (user) {
  var payload = {
    sub: user.email
  };
//expire in 5 h
  var token = jwt.sign(payload, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
  console.log('token',token)


  var transporter = nodemailer.createTransport(smtpTransport({
    host: config.email.host,
    port: config.email.port,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  }));

  var mailOptions = {
    from: '<config.email.user>',
    to: user.email,
    subject: 'Activare cont OpporTube',
    html: getHtml(token)
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) return console.log(err);

    console.log('email sent ', info.response);
  })
};

exports.handler = function (req, res) {
  var token = req.query.token;


  var payload = jwt.verify(token, config.secrets.session);

  jwt.verify(token, config.secrets.session, function(err, token) {
  });




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

  model.verifyUrl = 'http://localhost:9000/auth/verifyEmail?token='+token;


  return template(model);
}

function handleError(res) {
  return res.status(401).send({
    message: 'Autentificare eșuată, nu se poate verifica adresa de e-mail!'
  });
}
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};
 export default router;
