var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');


function loginSuccess(User,userLdap, done) {
  User.findOne({
    email: userLdap.uid
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      var role=function () {
        if(userLdap.sAMAccountName=== 'sdonose' || 'gcretu'){
          return role='admin'
        }
        else{
          return role='user'
        }
      };
      user = new User({
        name: userLdap.displayName,
        email: userLdap.mail,
        provider: 'ldap',
        role:role()
      });
      user.save(function(err) {
        return done(err, user); // Error happens here
      });
    } else {
      return done(err, user); // Error happens here
    }
  });
}



export function setup(User, config) {

  var server = {
    url: config.ldap.ldap_url,
    bindDn: config.ldap.ldap_bindDn,
    bindCredentials: config.ldap.ldap_bindCredentials,
    searchBase: config.ldap.ldap_searchBase,
    searchFilter: config.ldap.ldap_searchFilter
  };
  passport.use(
    new LdapStrategy({ server: server },
      function (userLdap, done) {
        loginSuccess(User,userLdap, done)
      }

  ))

}
