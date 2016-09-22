/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

(function () {

  class JobController {

    constructor($http, $state, $mdDialog, $mdMedia, Auth) {
      this.$http = $http;
      this.$state = $state;
      this.$mdDialog = $mdDialog;
      this.$mdMedia = $mdMedia;
      this.totalItems = '';
      this.predicate = '';
      this.reverse = true;
      this.currentPage = 10;
      this.viewby = 10;
      this.itemsPerPage = this.viewby;
      this.lessText = "<<";
      this.moreText = ">>";
      this.limit = 60;
      this.customFullscreen = '';
      this.isAdmin = Auth.isAdmin;
      this.candidate = Auth.getCurrentUser().name;
      this.search = {};
      this.jobs = [];
      this.candidates = [];

    }

    $onInit() {
      this.$http.get('/api/jobs')
        .then(response => {
          this.jobs = response.data;
          this.totalItems = this.jobs.length;
        });
      this.$http.get('/api/candidates/myApply/' + this.candidate)
        .then(response=> {
          this.candidates = response.data;

        });

    }

    disabledJob(jobId) {
      return this.candidates.some(function (candidate) {
        return candidate.job._id === jobId;
      })
    }


    recommend(jobId) {
      this.$state.includes("applyJob.opportunity", {id: jobId});
      this.$state.go('applyJob.opportunity', {id: jobId});

    };

    applyJob(jobId, jobTitle, jobAgency, ev) {
      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;

      this.$mdDialog.show({
        controller: 'ApplyJobModalController',
        templateUrl: 'app/job/applyJobModal.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        controllerAs: 'vm',
        bindToController: 'true',
        locals: {
          jobId: jobId,
          jobTitle: jobTitle,
          jobAgency: jobAgency
        }
      }).then(function () {
        this.disabledJob(jobId);
      });
    }

    showConfirm(jobId, jobTitle, ev) {

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;

      this.$mdDialog.show({
        controller: 'DeleteJobController',
        templateUrl: 'app/job/deleteJobModal.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        controllerAs: 'vm',
        bindToController: 'true',
        locals: {
          jobId: jobId,
          jobTitle: jobTitle
        }
      });
    }

    addComment(jobId, ev) {

      var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs')) && this.customFullscreen;

      this.$mdDialog.show({
        controller: 'CommentJobController',
        templateUrl: 'app/job/commentJobModal.html',
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        controllerAs: 'vm',
        bindToController: 'true',
        locals: {
          jobId: jobId
        }
      });

    };

    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
    };

    setItemsPerPage(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };

    order(predicate) {
      this.reverse = (this.predicate === predicate) ? !this.reverse : false;
      this.predicate = predicate;
    };

  }

  angular.module('recomNodeApp')
    .component('job', {
      templateUrl: 'app/job/job.html',
      controller: JobController
    });
})();
