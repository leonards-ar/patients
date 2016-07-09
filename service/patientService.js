angular.module('patients').factory('patientService',function($q, $http, $rootScope) {

    var access_token = $rootScope.auth_token;
    var patientService = {

      getOwners: function(){
        var deferred = $q.defer();

        //var url = "https://spreadsheets.google.com/tq?tq=select%20C%20where%20C%20is%20not%20null&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";
        var query = "select C, count(A) where C IS NOT NULL group by C";

        var encodedQuery = encodeURI(query);

        var url = "http://spreadsheet-proxy.cloudhub.io/tq?&tq="+encodedQuery+"&tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";

            $http({
                    url: url,
                    method: "GET",
                    // headers:{
                    //   Authorization: "Bearer " + access_token
                    // }
                })
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
      },
      getPlan: function(){
        var deferred = $q.defer();
        var query = "select G, count(A) where G IS NOT NULL group by G";

        var encodedQuery = encodeURI(query);

        var url = "http://spreadsheet-proxy.cloudhub.io/tq?&tq="+encodedQuery+"&tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";

            $http({
                    url: url,
                    method: "GET",
                    // headers:{
                    //   Authorization: "Bearer " + access_token
                    // }
                })
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

      },

      getPatient: function(patientName){
        var deferred = $q.defer();
        var query = "select A, count(C) where A like '%"+patientName+"%' group by A";

        var encodedQuery = encodeURI(query);
        console.log("!!!!!!!!!!!!!!!!!!!!!" + encodedQuery);

        var url = "http://spreadsheet-proxy.cloudhub.io/tq?&tq="+encodedQuery+"&tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";

        $http({
                url: url,
                method: "GET",
                // headers:{
                //   Authorization: "Bearer " + access_token
                // }
            })
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
      },
      getPathology: function(pathology){
        var deferred = $q.defer();
        var query = "select D, count(C) where D like '%"+pathology+"%' group by D";

        var encodedQuery = encodeURI(query);
        console.log("!!!!!!!!!!!!!!!!!!!!!" + encodedQuery);

        var url = "http://spreadsheet-proxy.cloudhub.io/tq?&tq="+encodedQuery+"&tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";

        $http({
                url: url,
                method: "GET",
                // headers:{
                //   Authorization: "Bearer " + access_token
                // }
            })
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
      },
      getHospital: function(hospital){
        var deferred = $q.defer();
        var query = "select E, count(C) where E like '%"+hospital+"%' group by E";

        var encodedQuery = encodeURI(query);

        var url = "http://spreadsheet-proxy.cloudhub.io/tq?&tq="+encodedQuery+"&tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0";

        $http({
                url: url,
                method: "GET",
                // headers:{
                //   Authorization: "Bearer " + access_token
                // }
            })
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

    return patientService;
});
