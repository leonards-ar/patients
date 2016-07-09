angular.module('patients').controller('NewpatientCtrl',function($scope, patientService,$rootScope,$timeout){

  var vm=$scope;

  vm.patient = {

  };

  function init(){
    //Wait until the token is authenticated.
    $timeout(function(){
      setPlanList();
    },3000);

  }

  function setPlanList(){
    patientService.getPlan().then(function(data){
      vm.planList = returnList(data);
    });
  }

  vm.autocompleteOwner = function(owner){
      return patientService.getOwners(owner).then(function(data){
        return returnList(data);
      });
  };

  vm.autcompletePatient = function(patient){
    return patientService.getPatient(patient).then(function(data){
      return returnList(data);
    });
  };

  vm.autocompletePathology = function(pathology){
    return patientService.getPathology(pathology).then(function(data){
      return returnList(data);
    });
  };

  vm.autocompleteHospital = function(hospital){
    return patientService.getHospital(hospital).then(function(data){
        return returnList(data);
    });

  };

  vm.save = function(){
    patientService.saveSpreadSheet(vm.patient).then(function(data){
      console.log("!!!!!Se guardo");
    }, function(){
        console.log("!!!!!Error");
    });
  };

  function returnList(dataQueryTable){
      var responseText = dataQueryTable.substring(8);
      var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));
      return resp.table.rows.map(function(item){
        return item.c[0].v;
      });
  }

  init();

});
