angular.module('patients').controller('NewpatientCtrl',function($scope, patientService,$rootScope){

  var vm=$scope;

  vm.patient = {

  };

  function init(){
    setOwnerList();
    setPlanList();
  }

  function setOwnerList(){
    patientService.getOwners().then(function(data){
     var responseText = data.substring(8);
     var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));

     vm.ownerList = [];
     angular.forEach(resp.table.rows, function(item) {
       vm.ownerList.push(item.c[0].v);
     });
   });

  }

  function setPlanList(){
    patientService.getPlan().then(function(data){
      var responseText = data.substring(8);
      var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));
      vm.planList = [];
      angular.forEach(resp.table.rows, function(item) {
        vm.planList.push(item.c[0].v);
      });
    });
  }

  vm.autcompletePatient = function(patient){
    return patientService.getPatient(patient).then(function(data){
      var responseText = data.substring(8);
      var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));
      return resp.table.rows.map(function(item){
        return item.c[0].v;
      });
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

  function returnList(dataQueryTable){
      var responseText = dataQueryTable.substring(8);
      var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));
      return resp.table.rows.map(function(item){
        return item.c[0].v;
      });
  }

  init();

});
