'use strict';

class LoginController {
  constructor(Auth, $state,$mdToast) {
    this.user = {};
    this.errors = {};
    this.submitted = false;
    this.$mdToast=$mdToast;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;


    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          if(this.Auth.getCurrentUser().active===false){
            this.Auth.logout();
            this.$mdToast.show(
              this.$mdToast.simple()
                .position('top')
                .textContent('Te rugăm să îți confirmi adresa de email! ')
                .hideDelay(10000)
            );
          }else{
            this.$state.go('job');
          }
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('recomNodeApp')
  .controller('LoginController', LoginController);
