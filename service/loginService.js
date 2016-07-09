angular.module('patients').factory('loginService',function($q,$rootScope,$http) {

    $rootScope.currentPageIndex = 0;

    var loginService = {

      refreshToken: function() {
        console.log("!!!!!!! Estoy en refreshToken");
        var deferred = $q.defer();
        chrome.identity.getAuthToken({interactive: true}, function (token) {


            if (chrome.runtime.lastError) {
                alert(chrome.runtime.lastError.message);
                return;
            }

            var url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + token;

            $http.get(url)
            .success(function(data, status, headers, config) {

                  console.log("!!!!!!!creo que salio todo bien: " + token);
                  $rootScope.email = data.email;
                  //$rootScope.avatar = data.picture;
                  $http.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                  deferred.resolve(data);

              })
              .error(function(data, status, headers, config) {
                  console.log("!!!!!!!y yo soy la concha de tu madre");
                  deferred.reject({
                      data: data,
                      status: status
                  });
              });
          });

          return deferred.promise;

      },

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
