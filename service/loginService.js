angular.module('patients').factory('loginService',function($q,$rootScope,$http) {

    $rootScope.currentPageIndex = 0;

    var loginService = {

      // login: function (){
      //   chrome.identity.getAuthToken({
      //       interactive: true
      //   }, function(token) {
      //     if (chrome.runtime.lastError) {
      //       alert(chrome.runtime.lastError.message);
      //       return;
      //     }
      //     var x = new XMLHttpRequest();
      //     x.open('GET', 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + token);
      //     x.onload = function() {
      //       var resp = JSON.parse(x.response);
      //       email = resp['email'];
      //     };
      //     x.send();
      //     $rootScope.access_token = token;
      //   });
      // },

    };

    return loginService;
});
