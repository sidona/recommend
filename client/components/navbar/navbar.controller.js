'use strict';

class NavbarController {
  //end-non-standard
  menu = [{
    'title': 'Oportunităţi disponibile',
    'state': 'job'
  },
    {
      'title': 'Recomandare nouă',
      'state': 'applyJob'
    },
    {
      'title': 'Recomandările mele',
      'state': 'userRecommend'
    },
    {
      'title': 'Aplicările mele',
      'state': 'myApply'
    }];

  menuDropdown=[
    {
      'title': 'Adăugare Oportunitate',
      'state': 'addJob'
    },
    {

    'title': 'Administrare CV-uri',
    'state': 'adminView'
  },
    {

      'title': 'CV-uri fără oportunitate',
      'state': 'adminViewCandidate'
    },

    {
      'title': 'Oportunităţi inactive',
      'state': 'inactiveJobs'
    },
    {
      'title': 'Administrare useri',
      'state': 'admin'
    }
  ];

  //start-non-standard
  constructor(Auth,$location,$scope) {

      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;
      this.showLogin=false;


      $scope.$watch(()=>{
       return $location.path();
      },(value)=>{
        if(value==='/register' || value==='/registerNewUserEmailSent'){
          this.showLogin=true
        }else{
          this.showLogin=false
        }
      })
    }

}

angular.module('recomNodeApp')
  .controller('NavbarController', NavbarController);
