
'use strict';

import express from 'express';
import passport from 'passport';
import {signToken} from '../auth.service';
var emailVerification=require('../emailVerification/emailVerification')

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Te rugam incearca din nou!'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
    console.log('res',req.body.email)
    //emailVerification.send(req.body.email)
  })(req, res, next)
});

export default router;
