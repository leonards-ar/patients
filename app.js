angular.module('patients', ['ui.bootstrap','ui.router','ngAnimate','blockUI','jlareau.pnotify']);

var promiseTranslation = null;

var tabSetIndex = 0;

var messagesLoadedQueue = [];
var sessionLoadedQueue = [];
var applicationInitializedQueue = [];
var isMessagesLoaded = false;
var isSessionLoaded = false;
var isApplicationInitialized = false;

function onMessagesLoaded(fn){
  messagesLoadedQueue.push(fn);
}

function onSessionLoaded(fn){
  sessionLoadedQueue.push(fn);
}

function onApplicationInitialized(fn){
  applicationInitializedQueue.push(fn);
}

function applicationInitialized(){
  if(isMessagesLoaded && isSessionLoaded){
    // console.error("On application initialized");
    while(applicationInitializedQueue.length > 0 ){
      var func= applicationInitializedQueue.pop();
      func.call();
    }
    isApplicationInitialized = true;

  }
}

function sessionLoaded(){

  if(!isSessionLoaded){
  // console.error("On session loaded");
  while(sessionLoadedQueue.length > 0 ){
    var func= sessionLoadedQueue.pop();
    func.call();
  }
  isSessionLoaded = true;
  applicationInitialized();
  }
}

function messagesLoaded(){
  if(!isMessagesLoaded){
  // console.error("On messages loaded");
    while(messagesLoadedQueue.length > 0 ){
      var func= messagesLoadedQueue.pop();
      func.call();
    }
    isMessagesLoaded = true;
    applicationInitialized();
  }
}

angular.module('patients').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('newPatient', {
        url: '/newPatient',
        templateUrl: 'app/patient/newPatient.html',
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/newPatient');

});

angular.module('patients').run(function($rootScope, loginService, $timeout) {
    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    function checkLogin() {
        // var restrictedPage = $.inArray($location.path(), ['/login', '/logout']) === -1;
        // var isConfirmPassword = $location.path().indexOf('/confirmPassword') >= 0;


        // var isAdminPage = $location.path().indexOf('/administration')>=0;

        // if(isConfirmPassword){
        //   sessionLoaded();
        //   return;
        // }

        console.log("!!!!!! Calling refreshToken()");

        loginService.refreshToken().then(function(){
          sessionLoaded();

        }, function(){

            //loginService.logout();

            isSessionLoaded = false;

        });
    }

    checkLogin();
    $timeout(3000);


});

angular.module('patients').config(function(blockUIConfig) {

  // Change the default overlay message
  blockUIConfig.message = 'Procesando...';

  blockUIConfig.autoBlock = false;

});
