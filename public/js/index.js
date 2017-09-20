var app = angular.module('myApp', ['ui.router', 'ui.bootstrap', 'angularSpinner']);

app.run(function($rootScope, $location, $state, AuthService, $window) {
  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams) {
      console.log('Changed state to: ' + toState);
    });

  if (AuthService.checkTokenExpiration() || !$window.sessionStorage.token) {
    $state.transitionTo('login');
  }

});


// ROUTE DEFINITION
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  //LOGIN STATE

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'login.html',
      controller: 'LoginController'
    })

    //LOGIN SSO STATE
    .state('loginp', {
      url: '/loginp',
      templateUrl: 'loginpasscode.html',
      controller: 'LoginpController'
    })

    //HOME PAGE STATE
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      controller: 'HomeController'
    });
}]);

//Controller for Header

app.controller('HeaderController', function($rootScope, $scope, $window, $state) {


  //Check current view to show the log out button and the account information
  $scope.currentstate = function() {
    $rootScope.region = $window.sessionStorage.regionName;
    $rootScope.user = $window.sessionStorage.username;
    return $state.is('home');
  }

  //LogOut function
  $scope.LogOut = function() {
    console.log("Entro en LogOut");
    //$window.sessionStorage.empty();
    $state.transitionTo('login');
  }
})

//Controller for regular login
app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, AuthService, $window) {

  $rootScope.title = "IBM Bluemix Authentication";

  //Delete everything stored in sessionStorage
  $window.sessionStorage.clear();


  $scope.formSubmit = function() {

    if ($scope.account.region) {

      //Set Session Storage User Info
      $window.sessionStorage.username = $scope.username;
      $window.sessionStorage.regionName = $scope.account.region;

      console.log("username: " + $scope.username + " password: " + $scope.password + " region: " + $scope.account.region);

      //GET THE ASSOCIATED CODE TO THE SELECTED REGION
      switch ($scope.account.region) {
        case 'US-SOUTH':
          $window.sessionStorage.regionID = "ng";
          $window.sessionStorage.regionURL = "us-south";
          break;
        case 'GERMANY':
          $window.sessionStorage.regionID = "eu-de";
          $window.sessionStorage.regionURL = "eu-de"
          break;
        case 'UNITED KINGDOM':
          $window.sessionStorage.regionID = "eu-gb";
          $window.sessionStorage.regionURL = "eu-gb"
          break;
        case 'SIDNEY':
          $window.sessionStorage.regionID = "au-syd";
          $window.sessionStorage.regionURL = "au-syd";
          break;
        default:
          $window.sessionStorage.regionID = "ng";
          $window.sessionStorage.regionURL = "us-south";
      }

      //GET BLUEMIX AUTHORIZATION ENDPOINT

      AuthService.endpoint($scope.username, $scope.password).then(function(result) {

          console.log("RESULTADO: " + JSON.stringify(result));

          //Check if  user credentials are valid
          if (result.data.error_description) {
            $scope.errorText = result.data.error_description;
            $scope.showerror = true;

          } else {


            $rootScope.otoken = result.data.access_token;
            $window.sessionStorage.token = result.data.access_token;
            $window.sessionStorage.expiresAt = result.data.expires_in;


            $state.transitionTo('home');
          }



        },
        function(error) {
          console.log("ERROR" + JSON.stringify(error));
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.expiresAt;



        });

    } //END CHECK EMPTY FIELDS
    else {

      $scope.showerror = true;
      $scope.errorText = "Please, fill the required fields.";

    }

  };

});

//Controller for IBM SSO login
app.controller('LoginpController', function($scope, $rootScope, $stateParams, $state, AuthService, $window) {
  $rootScope.title = "IBM Bluemix Authentication";
  $scope.showsso = false;
  //Delete everything stored in sessionStorage
  $window.sessionStorage.clear();

  //GET THE ASSOCIATED CODE TO THE SELECTED REGION FOR SSO PASSCODE URL
  $scope.selectupdated = function() {
    switch ($scope.account.region) {
      case 'US-SOUTH':
        $scope.passcodeurl = "ng";
        break;
      case 'GERMANY':
        $scope.passcodeurl = "eu-de";
        break;
      case 'UNITED KINGDOM':
        $scope.passcodeurl = "eu-gb";
        break;
      case 'SIDNEY':
        $scope.passcodeurl = "au-syd";
        break;
      default:
        $scope.passcodeurl = "ng";

    }
    $scope.showsso = true;



  }


  $scope.formSubmit = function() {

    if ($scope.account.region) {

      //Set Session Storage User Info
      $window.sessionStorage.regionName = $scope.account.region;
      $window.sessionStorage.passcode = $scope.passcode;

      console.log(" password: " + $scope.passcode + " region: " + $scope.account.region);
      switch ($scope.account.region) {
        case 'US-SOUTH':
          $window.sessionStorage.regionID = "ng";
          $window.sessionStorage.regionURL = "us-south";
          break;
        case 'GERMANY':
          $window.sessionStorage.regionID = "eu-de";
          $window.sessionStorage.regionURL = "eu-de"
          break;
        case 'UNITED KINGDOM':
          $window.sessionStorage.regionID = "eu-gb";
          $window.sessionStorage.regionURL = "eu-gb"
          break;
        case 'SIDNEY':
          $window.sessionStorage.regionID = "au-syd";
          $window.sessionStorage.regionURL = "au-syd";
          break;
        default:
          $window.sessionStorage.regionID = "ng";
          $window.sessionStorage.regionURL = "us-south";
      }

      AuthService.endpointpasscode($scope.passcode).then(function(result) {

          console.log("RESULTADO: " + JSON.stringify(result));

          //Check if the user credentials are valid
          if (result.data.error_description) {
            $scope.errorText = result.data.error_description;
            $scope.showerror = true;

          } else {


            $rootScope.otoken = result.data.access_token;
            $window.sessionStorage.token = result.data.access_token;
            $window.sessionStorage.expiresAt = result.data.expires_in;


            $state.transitionTo('home');
          }



        },
        function(error) {
          console.log("ERROR" + JSON.stringify(error));
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.expiresAt;



        });

    } //END CHECK EMPTY FIELDS
    else {

      $scope.showerror = true;
      $scope.errorText = "Please, fill the required fields.";

    }

  };

});

app.controller('HomeController', function($scope, $q, $rootScope, $stateParams, $state, AuthService, sharedValues, $window, usSpinnerService) {
  $scope.account = {};
  $scope.account.organizations = "";
  $scope.showerror = false;
  $scope.showcalendar = false;
  $scope.graphcontent = [];
  $scope.showbillingtable = false;
  $scope.showexport = false;
  $scope.showchart = false;

  //START LOADING SPINNER

  usSpinnerService.spin('spinner-1');



  /***** CHART CONFIGURATION ******/
  var d = new Date();
  var n = d.getMonth();
  $scope.actualyear = d.getFullYear();
  $scope.year = $scope.actualyear;
  $scope.actualmonth = n + 1;


  /***** START CALENDAR CONFIGURATION ******/

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.minDate = $scope.minDate ? null : new Date();
  $scope.maxDate = new Date("12/31/2023");


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log("entro en open calendar");

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    minMode: 'month'
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  //INCREASE CALENDAR YEAR

  $scope.increaseyear = function() {
    var year = d.getFullYear()

    if ($scope.year < year) {
      $scope.year++;
    }
  }

  //Check actual date

  $scope.checkdate = function(month) {

    var d = new Date();
    var amonth = d.getMonth();
    var year = d.getFullYear()

    if ($scope.year == year && month > amonth + 1) {
      return true;
    }

  }

  //SET DISABLED CLASS FOR NOT AVAILABLE MONTHS
  $scope.getclass = function(month) {

    var d = new Date();
    var amonth = d.getMonth();
    var year = d.getFullYear()

    if ($scope.year == year && month > amonth + 1) {
      return 'disabled';
    }

  }



  /***** END CALENDAR CONFIGURATION ******/

  //Export data in the table to excel format

  $scope.exportexcel = function() {
    console.log("entro en export excel");
    var blob = new Blob([document.getElementById('exportable').innerHTML], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
    saveAs(blob, "Report.xls");
  };

  //START Export data in the table to csv format
  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {
      type: "text/csv"
    });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  $scope.exportTableToCSV = function() {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    var filename = "billing.csv";

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++)
        row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  }

  //END Export data in the table to csv format



  //GET TOTAL billing for each space within the organization
  $scope.getTotal = function(space) {
    var total = 0;
    for (var i = 0; i < space.applications.length; i++) {
      var application = space.applications[i];
      for (var j = 0; j < application.usage.length; j++)
        total += application.usage[j].cost;
    }

    for (var i = 0; i < space.services.length; i++) {
      var service = space.services[i];
      for (var j = 0; j < service.instances.length; j++)
        for (var z = 0; z < service.instances[j].usage.length; z++)
          total += service.instances[j].usage[z].cost;
    }
    return (total).toFixed(2);
  }

  //GET TOTAL ARRAY billing for all spaces within the organization in the chosen date

  $scope.getTotalinArray = function(billingdata) {
    var spacestotal = [];
    spacestotal.results = [];
    spacestotal.names = [];

    for (var i = 0; i < billingdata.length; i++) {
      var result = $scope.getTotal(billingdata[i]);
      var name = billingdata[i].name;
      spacestotal.results.push(result);
      spacestotal.names.push(name);

    }
    return spacestotal;
  }



  //Shows chart information for the actual year

  $scope.barchartContent = function(billingdata) {


    /****** START CHART CONFIGURATION *****/

    var barChartData = {
      labels: billingdata.names,
      "datasets": [{
        "label": "Spaces Usage Comparison",
        "data": billingdata.results,
        "fill": true,
        "borderColor": "rgb(75, 192, 192)",
        "lineTension": 0.1,
        "backgroundColor": "#33a0a0"
      }]


    };
    if (window.myBar)
      window.myBar.destroy();

    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
        title: {
          display: true,
          text: "Spaces Billing Comparison"
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,

            },
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });

    /***** END CHART CONFIGURATION ******/




  }

  //Get Bluemix Services Catalog
  AuthService.services().then(function(services) {

      //console.log("***SERVICES**** : " + JSON.stringify(services.data.resources));
      $scope.account.services = services.data.resources;



    },
    function(error) {
      console.log("ERROR" + JSON.stringify(error));
    });

  //Get Bluemix available organizations for the user
  AuthService.organizations().then(function(organizations) {

      //console.log("***ORGANIZATIONS**** : " + JSON.stringify(organizations.data.resources));
      $scope.account.organizations = organizations.data.resources;
      usSpinnerService.stop('spinner-1');



    },
    function(error) {
      console.log("ERROR" + JSON.stringify(error));
      $scope.showerror = true;
      $scope.errorText = "Something has failed. Please try again later.";


    });

  //Get Organization value from the selector
  $scope.update = function() {
    //Check if the session token has expired
    if (AuthService.checkTokenExpiration()) {
      $state.transitionTo('login');

    } else {

      console.log("Valor de select " + JSON.stringify($scope.selectedItem));
      $scope.showcalendar = true;

      $scope.org = $scope.selectedItem;

    }




  }

  //Get Billing by organization and date
  $scope.billingbymonth = function(month) {

    usSpinnerService.spin('spinner-1');



    console.log("YEAR " + $scope.year);
    console.log("MONTH " + month);
    $scope.spaces = [];


    //Check if the session token has expired
    if (AuthService.checkTokenExpiration()) {
      $state.transitionTo('login');

    } else {
      AuthService.billingtest($scope.org, month, $scope.year).then(function(billing) {

          console.log("***BILLING**** : " + JSON.stringify(billing.data));
          $scope.showbillingtable = true;
          $scope.showchart = true;
          $scope.showexport = true;
          $scope.showerror = false;

          if (billing.data.organizations.length > 0) {
            if (billing.data.organizations[0].non_billable_usage.spaces.length > 0) {
              var array = $scope.getTotalinArray(billing.data.organizations[0].non_billable_usage.spaces);
              $scope.barchartContent(array);
              $scope.spaces = billing.data.organizations[0].non_billable_usage.spaces;

            }
            if (billing.data.organizations[0].billable_usage.spaces.length > 0) {
              var array = $scope.getTotalinArray(billing.data.organizations[0].billable_usage.spaces);
              $scope.barchartContent(array);
              $scope.spacesbillable = billing.data.organizations[0].billable_usage.spaces;
            }
          } else {
            $scope.showerror = true;
            $scope.errorText = "You have not deployed any service or application yet!";
          }
          usSpinnerService.stop('spinner-1');

        },
        function(error) {
          usSpinnerService.stop('spinner-1');
            $scope.spaces = [];
          if (window.myBar)
            window.myBar.destroy();
          console.log("ERROR" + JSON.stringify(error));

          $scope.showerror = true;
          $scope.errorText = error.data.error.message;
        });
    }
  }

  //Get Services Icons
  $scope.getpic = function(service) {
    var services = $scope.account.services;
    for (var i = 0; i < services.length; i++) {
      if (services[i].entity.unique_id.localeCompare(service) == 0) {

        var json = JSON.parse(services[i].entity.extra);
        console.log("IMAGEN****: " + json.smallImageUrl);
        if (json.smallImageUrl != "")
          return json.smallImageUrl;
        else
          return json.imageUrl;

      }

    }
    return "images/logo.png";

  }


});
