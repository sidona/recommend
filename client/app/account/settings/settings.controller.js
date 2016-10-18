'use strict';

class SettingsController {

  constructor(Auth) {
    this.Auth = Auth;
    this.errors = {};
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Parola a fost schimbată cu succes!';
        })
        .catch(err => {
          this.errors.other = err.data.message;
        });
    }
  }
}

angular.module('recomNodeApp')
  .controller('SettingsController', SettingsController);
