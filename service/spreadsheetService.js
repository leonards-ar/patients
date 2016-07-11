angular.module('patients').factory('spreadsheetService',function($q, $http) {

    var spreadsheetService = {

      getSheetInformation: function(sheetId){
        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId;
        
        var deferred = $q.defer();

        $http.get(url)
        .success(function(data, status, headers, config) {
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject({
                data: data,
                status: status
            });
        });
        return deferred.promise;
      }

    };

    return spreadsheetService;
});
