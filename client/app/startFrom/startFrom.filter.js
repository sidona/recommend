'use strict';

function startFromFilter() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
  };
}


angular.module('recomNodeApp')
  .filter('startFrom', startFromFilter);
