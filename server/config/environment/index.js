'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'recom-node-secret'
  },

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  ldap:{
    ldap_url:process.env.ldap_url,
    ldap_bindDn:process.env.ldap_bindDn,
    ldap_bindCredentials:process.env.ldap_bindCredentials,
    ldap_searchBase:process.env.ldap_searchBase,
    ldap_searchFilter:process.env.ldap_searchFilter,
  },

  email:{
    host:process.env.host,
    port:process.env.port,
    email:process.env.email,
    password:process.env.pass
  }


};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require('./' + process.env.NODE_ENV + '.js') || {});