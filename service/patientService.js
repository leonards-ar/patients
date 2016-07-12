angular.module('patients').factory('patientService',function($q, $http, $rootScope) {

    var access_token = $rootScope.auth_token;
    var patientService = {

      getOwners: function(ownerName,spreadSheetId){
        var deferred = $q.defer();
        var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key="+spreadSheetId+"&gid=0&tq=";
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
        var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key=some_value&gid=0&tq=";
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

      getPatient: function(patientName, spreadSheetId){
        var deferred = $q.defer();
        var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key="+spreadSheetId+"&gid=0&tq=";
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
      getPathology: function(pathology, spreadSheetId){
        var deferred = $q.defer();
        var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key="+spreadSheetId+"&gid=0&tq=";
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
      getHospital: function(hospital, spreadSheetId){
        var deferred = $q.defer();
        var url = "http://spreadsheet-proxy.cloudhub.io/tq?tqx=out:json&key="+spreadSheetId+"&gid=0&tq=";
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
      saveSpreadSheet: function (patient,spreadSheet){

        var deferred = $q.defer();
        var url = "https://sheets.googleapis.com/v4/spreadsheets/" + spreadSheet.sheetId + ":batchUpdate";

        var request = {
          "requests":[{
              "appendCells":
                {
                "sheetId": spreadSheet.princpalSheetId,
                "rows":[{
                  "values":[{
                      "userEnteredValue":{
                        "stringValue": patient.name
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
      },

      getImage: function(url){
        var deferred = $q.defer();

        $http.get(url)
          .success(function(data, status, headers, config){
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
            deferred.reject({
                data: data,
                status: status
          });
        });
      }
    };

    return patientService;
});
