angular.module('patients').controller('NewpatientCtrl',function($scope, patientService,$rootScope,$timeout,flashService,spreadsheetService){

  var vm=$scope;

  vm.patient = {

  };

  vm.files = [];
  vm.filename = "";

  function init(){
    //Wait until the token is authenticated.
    $timeout(function(){
      // setPlanList();
      chrome.storage.sync.get('files', function(result){
        if(result.files){
          vm.files = result.files;
        }
        vm.isEmpty();
      });
    },3000);

  }

  function setPlanList(){
    patientService.getPlan().then(function(data){
      vm.planList = returnList(data);
    });
  }

  vm.autocompleteOwner = function(owner){
      return patientService.getOwners(owner,vm.files[0].sheetId).then(function(data){
        return returnList(data);
      });
  };

  vm.autcompletePatient = function(patient){
    return patientService.getPatient(patient, vm.files[0].sheetId).then(function(data){
      return returnList(data);
    });
  };

  vm.autocompletePathology = function(pathology){
    return patientService.getPathology(pathology, vm.files[0].sheetId).then(function(data){
      return returnList(data);
    });
  };

  vm.autocompleteHospital = function(hospital){
    return patientService.getHospital(hospital, vm.files[0].sheetId).then(function(data){
        return returnList(data);
    });

  };

  vm.save = function(){
    flashService.showLoading();
    // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'files': vm.files}, function() {
          // Notify that we saved.
          console.log('Settings saved');
        });
    patientService.saveSpreadSheet(vm.patient,vm.files).then(function(responses){
      flashService.hideLoading();
      responses.forEach( function(data){
        flashService.showSuccess("Se ha guardado el Paciente en la planilla " + data.title);
      });

      vm.patient = {};
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

  vm.isEmpty = function(){
    return vm.files.length > 0;
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
        defaultFormat: data.properties.defaultFormat
    };
    var principalSheet = getSheetId(data.sheets,0);

    if(principalSheet){
      sheetData.princpalSheetId = principalSheet[0].properties.sheetId;
    } else {
        var error = {
          "message": "Bad File Format. Missing principal sheet",
          "code": 500
        };
    }

    return sheetData;

  }

  function getSheetId(sheets, index){
    return sheets.filter(function(sheet){
      return sheet.properties.index === index;
    });
  }

  init();

});
