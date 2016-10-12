/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

import User from '../api/user/user.model';


 User.find({})
   .then(() => {
     User.create({
       provider: 'local',
       name: 'admin',
       email: 'sdonose@pentalog.fr',
       password: 'test'
     }, {
       provider: 'local',
       role: 'admin',
       name: 'Admin',
       email: 'admin@example.com',
       password: 'admin'
     })
     .then(() => {
       console.log('finished populating users');
     });
   });
