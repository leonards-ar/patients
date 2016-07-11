// The Browser API key obtained from the Google Developers Console.
    // Replace with your own Browser API key, or your own key.
    var files = [];

    var developerKey = 'AIzaSyAfwFi7pYBHOhEQwBjof0DSinaN_gBana8 ';

    // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    var clientId = "217086337535-n34kv375gatp8uvdtt2v8ldggn76qv9v.apps.googleusercontent.com";

    // Replace with your own App ID. (Its the first number in your Client ID)
    var appId = "217086337535";

    // Scope to use to access user's Drive items.
    var scope = ['https://www.googleapis.com/auth/drive'];

    var pickerApiLoaded = false;
    var oauthToken;

    // Use the Google API Loader script to load the google.picker script.
    function loadPicker() {
      gapi.load('auth', {'callback': onAuthApiLoad});
      gapi.load('picker', {'callback': onPickerApiLoad});
    }

    function onAuthApiLoad() {
      window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult);
    }

    function onPickerApiLoad() {
      pickerApiLoaded = true;
      createPicker();
    }

    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        oauthToken = authResult.access_token;
        createPicker();
      }
    }

    // Create and render a Picker object for searching images.
    function createPicker() {
      if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.SPREADSHEETS);
        view.setOwnedByMe(true);
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .setDeveloperKey(developerKey)
            .setCallback(pickerCallback)
            .build();
         picker.setVisible(true);
      }
    }

    // A simple callback implementation.
    function pickerCallback(data) {
      if (data.action === google.picker.Action.PICKED) {
        var fileId = data.docs[0].id;
        files.push(data.docs[0]);
        alert('The user selected: ' + fileId);
      }
    }
