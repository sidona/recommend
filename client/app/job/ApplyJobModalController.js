/**
 * Created by sdonose on 8/10/2016.
 */
'use strict';

class ApplyJobModalController {
  constructor($http, Auth, $location, $mdDialog, $stateParams, $mdToast, jobId, jobTitle, jobAgency) {
    this.$http = $http;
    this.Auth = Auth;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.$mdToast = $mdToast;
    this.jobId = jobId;
    this.jobTitle = jobTitle;
    this.jobAgency = jobAgency;
    this.candidates = [];
    this.candidate = Auth.getCurrentUser().name;

  }

  hide() {
    this.$mdDialog.hide();
  };

  cancel() {
    this.$mdDialog.cancel();
  };

  confirmApply() {
    if (this.information) {
      this.$http.post('/api/candidates/', {
        information: this.information,
        full_name: this.Auth.getCurrentUser().name,
        recommend_by: this.Auth.getCurrentUser().name,
        skill: 'intern',
        cv_file: 'intern',
        job: this.jobId,
        for_agency: this.jobAgency,
        jobTitle:this.jobTitle
      }).then(() => {
        this.$mdDialog.hide();

        this.$mdToast.show(
          this.$mdToast.simple()
            .position('top')
            .textContent('Aplicarea ta a fost trimisă cu succes! ')
            .hideDelay(3000)
        );
      });
      this.information = '';
    }
  };

}
angular.module('recomNodeApp')
  .controller('ApplyJobModalController', ApplyJobModalController)
