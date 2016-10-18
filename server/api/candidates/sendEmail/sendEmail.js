/**
 * Created by sdonose on 8/22/2016.
 */


import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import _ from 'underscore';
import lodash from 'lodash';
import config from'../../../config/environment'

var transporter = nodemailer.createTransport(smtpTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
}));

var mailOptions = {
  from: '<test.testpentalog@gmail.com>',
  to: 'sdonose@pentalog.fr, gcretu@pentalog.fr',
  subject: ' Recomandare nouă',
  text: 'test'
};
function getHtml() {
  var path = 'server/views/email.html';
  var html = fs.readFileSync(path, 'utf8');

  return _.template(html);
}
export function sendEmail(req, res) {
  var data = req.body;
  console.log(data)
  var tpl = getHtml();
  if(data.job==='fara'){
    var options = lodash.merge(mailOptions, {
      html: tpl({
        title:data.jobTitle,
        full_name: data.full_name
      })
    });
  }
  else{
    var options = lodash.merge(mailOptions, {
      html: tpl({
        title:'pentru oportunitatea '+data.jobTitle,
        full_name: data.full_name
      })
    });
  }

  transporter.sendMail(options, function (error, info) {
    if (error) {
      return console.log(error);
    } else {
      console.log('Message sent: ' + info.response);
      res.json('send email');

    }

  })
}

