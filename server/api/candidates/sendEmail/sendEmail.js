/**
 * Created by sdonose on 8/22/2016.
 */


import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import _ from 'underscore';
import lodash from 'lodash';
import User from '../../user/user.model';
import candidate from '../candidate.controller';
import isAuthenticate from '../../../auth/auth.service';

function UserEmail(name) {
  this.name=name;
}
console.log(UserEmail);
console.log('user------',User);




var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.pentalog.fr',
  port: 587,
  auth: {
    user: '',
    pass: ''
  }
}));

var mailOptions = {
  from: '<sdonose@pentalog.fr>',
  to: 'sidona_g@yahoo.com',
  subject: ' Recomandare noua',
  text:'test'
};
function getHtml() {
  var path = 'server/views/email.html';
  var html = fs.readFileSync(path, 'utf8');

  return _.template(html);
}
export function sendEmail(req, res) {
  var isAuthenticate=req.user
  var tpl = getHtml();
  var options = lodash.merge(mailOptions, {
    html: tpl({
      experience: "much",
      for_agency: isAuthenticate
    })
  });
  transporter.sendMail(options, function (error, info) {
    if (error) {
      return console.log(error);
    }else{
      console.log('Message sent: ' + info.response);
      res.json('send email');

      console.log('user',User);
      console.log('isAuthenticate',isAuthenticate)
    }

  })
}

