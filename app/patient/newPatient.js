angular.module('patients').controller('NewpatientCtrl',function($scope, patientService,$rootScope,$timeout,flashService,spreadsheetService){

  var vm=$scope;

  vm.patient = {

  };

  vm.files = [];
  vm.filename = "";
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
    flashService.showLoading();
    patientService.saveSpreadSheet(vm.patient,vm.files[0]).then(function(data){
      flashService.hideLoading();
      flashService.showSuccess("Se ha guardado el Paciente");
      vm.patient = {};
    }, function(data){
        flashService.hideLoading();
        flashService.handleError(data);
    });


  };

  vm.reset = function(){
    vm.patient = {};
  };

  vm.addFile = function(filename){
    if(filename !== "" ){
        flashService.showLoading();
        var regex = /^https:\/\/.*\/.*\/(.*)\/.*$/g;
        var sheetId = regex.exec(filename)[1];
        if(!sheetId){
          flashService.showError("Bad Filename");
          flashService.hideLoading();
          return;
        }
        spreadsheetService.getSheetInformation(sheetId).then(function(data){
          var sheetMetadata = buildSheetMetadata(data);
          sheetMetadata.filename = filename;
          vm.files.push(sheetMetadata);
          flashService.hideLoading();
        }, function(data){
            flashService.hideLoading();
            if(data.status === 404){
              var error = {
                message: "No se encontro el archivo",
                code: data.status
              };
              flashService.showError(error);
            } else {
              flashService.handleError(data);
            }

        });
    }
  };

  vm.removeFile = function(index){
    vm.files.splice(index, 1);

  };

  function returnList(dataQueryTable){
      var responseText = dataQueryTable.substring(8);
      var resp = JSON.parse(responseText.replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g,''));
      return resp.table.rows.map(function(item){
        return item.c[0].v;
      });
  }

  function buildSheetMetadata(data){

    var sheetData = {
        title: data.properties.title,
        sheetId: data.spreadsheetId,
        textFormat: data.properties.defaultFormat.textFormat,
        sheets: data.sheets
    };

    return sheetData;


  }

  init();

});
