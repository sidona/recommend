'use strict';

class SettingsController {

  constructor(Auth) {
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Parola a fost schimbată cu succes!';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Parolă incorectă!';
          this.message = '';
        });
    }
  }
}

angular.module('recomNodeApp')
  .controller('SettingsController', SettingsController);
