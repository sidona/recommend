'use strict';

class SignupController {
  //end-non-standard

  constructor(Auth, $state,$mdToast) {
      this.Auth = Auth;
      this.$state = $state;
    this.$mdToast=$mdToast;
    }
    //start-non-standard


  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('logout');
          this.Auth.logout();
          this.$mdToast.show(
            this.$mdToast.simple()
              .position('top')
              .textContent('Te rugăm să îți verifici adresa de email pentru confirmare!')
              .hideDelay(8000)
          );
        })
        .catch(err => {
          err = err.data;
          this.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}

angular.module('recomNodeApp')
  .controller('SignupController', SignupController);
