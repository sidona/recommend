'use strict';

import express from 'express';
import passport from 'passport';
import config from '../config/environment';
import User from '../api/user/user.model';

var emailVerification=require('./emailVerification/emailVerification')

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local').default);
router.get('/verifyEmail',emailVerification.handler)


export default router;
