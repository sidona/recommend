/**
 * Created by sdonose on 8/22/2016.
 */


import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import fs from 'fs';
import _ from 'underscore';
import lodash from 'lodash';

var transporter = nodemailer.createTransport(smtpTransport({
  host: 'smtp.pentalog.fr',
  port: 587,
  auth: {

  }
}));

var mailOptions = {
  from: '<sdonose@pentalog.fr>',
  to: 'sidona_g@yahoo.com',
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
  var tpl = getHtml();
  if(data.job==='fara'){
    var options = lodash.merge(mailOptions, {
      html: tpl({
        recommend_by:data.recommend_by,
        title:data.jobTitle,
        full_name: data.full_name
      })
    });
  }
  else{
    var options = lodash.merge(mailOptions, {
      html: tpl({
        recommend_by:data.recommend_by,
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

