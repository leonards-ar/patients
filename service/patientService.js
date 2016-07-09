angular.module('patients').factory('patientService',function($q, $http, $rootScope) {

    var access_token = $rootScope.auth_token;
    var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key=1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY&gid=0&tq=";
    var patientService = {

      getOwners: function(ownerName){
        var deferred = $q.defer();

        var query = "select C, count(A) where lower(C) like '%"+ownerName.toLowerCase()+"%' group by C";

        var encodedQuery = encodeURI(query);

            $http({
                    url: url + encodedQuery,
                    method: "GET",
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

            $http({
                    url: url + encodedQuery,
                    method: "GET",
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
        var query = "select A, count(C) where lower(A) like '%"+patientName.toLowerCase()+"%' group by A";

        var encodedQuery = encodeURI(query);

        $http({
                url: url + encodedQuery,
                method: "GET",
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
        var query = "select D, count(C) where lower(D) like '%"+pathology.toLowerCase()+"%' group by D";

        var encodedQuery = encodeURI(query);

        $http({
                url: url + encodedQuery,
                method: "GET",
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
        var query = "select E, count(C) where lower(E) like '%"+hospital.toLowerCase()+"%' group by E";

        var encodedQuery = encodeURI(query);

        $http({
                url: url + encodedQuery,
                method: "GET",
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
      saveSpreadSheet: function (patient){

        var deferred = $q.defer();
        url = "https://sheets.googleapis.com/v4/spreadsheets/1vEKEXN718Nsow0-W_hrQFQvZk6XnPa0RS7l3DhvxCHY:batchUpdate";

        var request = {
          "requests":[{
              "appendCells":
                {
                "sheetId": 1546513263,
                "rows":[{
                  "values":[{
                      "userEnteredValue":{
                        "stringValue": patient.name
                      },
                      "effectiveFormat":{
                        "textFormat":{
                          "fontFamily": "Arial",
                          "fontSize": 12
                        }
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.date
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.invoiceOwner
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.pathology
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.hospital
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.room
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.plan
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": ""
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.credential_number
                      }
                    },
                    {
                      "userEnteredValue":{
                        "stringValue": patient.treaetment
                      }
                    }
                  ]
                }],
                "fields":"*"
              }
            }]
        };

        $http.post(url,request)
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
