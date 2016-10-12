'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'login',
        templateUrl: 'app/account/login/login.html',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer || 'login';
          Auth.logout();
          $state.go('login');
        }
      })
      .state('registerNewUserEmailSent',{
        url:'/registerNewUserEmailSent',
        templateUrl: 'app/account/signup/registerSuccess.html',
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
