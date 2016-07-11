angular.module('patients')
    .config(['notificationServiceProvider', function(notificationServiceProvider) {

        notificationServiceProvider.setDefaults({
            history: false,
            delay: 2500,
            closer: true,
            sticker_hover : false,
            sticker : false,
            closer_hover: true,
            mouse_reset: true
        });

    }])
;
angular.module('patients').factory('flashService',function($q,$uibModal,notificationService, blockUI,  $timeout) {

  function handleError(data)
{
if(data.status === 401 || data.status === 403){
    data.message = "Access denied";
    data.code = data.status;
    showError(data);
}else if(data.status >= 500){
    data.message = "Server error";
    data.code = 500;
    showError(data);
}
else if(data.data){
  if(data.data[0] === undefined){
    showError(data.data);
  }
  else {
    showErrors(data.data);
  }
}else{
  data.message = "Unknown error. Please retry.";
  showError(data);
}
}

function showError(error){
// notificationService.error(error.message + (error.code ? " (code: " + error.code+ ")" : ""));
notificationService.error(error.message);
}

function showWarning(message){
notificationService.notice(message);
}

function showLoading(){
blockUI.start();

}

function hideLoading(){
blockUI.stop();

}
function showSuccess(message){
  notificationService.success(message);
}

function showErrors(errors){
  var message = $("<ul></ul>");

  if(errors.message !== undefined){
      showError(errors);
      return;
  }

  if(errors.length === 1){
      showError(errors[0]);
      return;
  }

  for(var i in errors){
      var error = errors[i];
      if(error.message !== undefined){
          // message.append($("<li>"+ error.message + " (code: " + error.code+ ")"+"</li>"));
          message.append($("<li>"+ error.message + "</li>"));
        }
  }


  notificationService.error($("<div/>").append(message).html());
}
var flashService = {

showConfirm:function(title) {
var deferred = $q.defer();

var modalInstance = $uibModal.open({
    animation: true,
    templateUrl: 'app/shared/ConfirmModal.html',
    controller: 'ConfirmModalCtrl',
    size: 'sm',
    resolve: {
        title: function () {
            return title;
        }
    }
});

modalInstance.result.then(function (confirmed) {
    if(confirmed){
        deferred.resolve();
    }
    else{
      deferred.reject();
    }
}, function () {
    deferred.reject();
});

return deferred.promise;
}
};

flashService.handleError = handleError;
flashService.showSuccess = showSuccess;
flashService.showError = showError;
flashService.showWarning = showWarning;
flashService.showErrors = showErrors;
flashService.showLoading = showLoading;
flashService.hideLoading = hideLoading;
return flashService;

});
