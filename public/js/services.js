app.factory('AuthService', function($q, $http, $window) {


        return {
            endpoint: function(username, password) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en endpoint service");

                $http({
                    method: 'POST',
                    url: 'bx/oauth',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        region: $window.sessionStorage.regionID,
                        username: username,
                        password: password
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            endpoint: function(username, password) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en endpoint service");

                $http({
                    method: 'POST',
                    url: 'bx/oauth',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        region: $window.sessionStorage.regionID,
                        username: username,
                        password: password
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            endpointpasscode: function(passcode) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en endpoint passcode service");

                $http({
                    method: 'POST',
                    url: 'bx/oauthpasscode',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        region: $window.sessionStorage.regionID,
                        passcode: passcode
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            organizations: function() {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en organizations service");

                $http({
                    method: 'POST',
                    url: 'bx/organizations',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        token: $window.sessionStorage.token
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            services: function() {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en organizations service");

                $http({
                    method: 'POST',
                    url: 'bx/services',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        token: $window.sessionStorage.token
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            spaces: function(spaceID) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en spaces service");

                $http({
                    method: 'POST',
                    url: 'bx/spaces',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        token: $window.sessionStorage.token,
                        spaceID: spaceID
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },

            billing: function(orgUID) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en billing service");

                $http({
                    method: 'POST',
                    url: 'bx/billing',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        token: $window.sessionStorage.token,
                        region: $window.sessionStorage.region,
                        regionID: $window.sessionStorage.regionID,
                        orgUID: orgUID
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http");
                    defered.resolve(response);
                }, function errorCallback(error) {
                    defered.reject(error);
                });

                return promise;
            },
            billingtest: function(orgUID, month, year) {

                var defered = $q.defer();
                var promise = defered.promise;
                console.log("entro en billing service year: " + year + "month " + month + "year " + year + "region: " + $window.sessionStorage.regionURL + " regionID: " + $window.sessionStorage.regionID + "token: " + $window.sessionStorage.token);

                $http({
                    method: 'POST',
                    url: 'bx/billingtest',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:8080'
                    },
                    data: {
                        token: $window.sessionStorage.token,
                        region: $window.sessionStorage.regionURL,
                        regionID: $window.sessionStorage.regionID,
                        orgUID: orgUID,
                        month: month,
                        year: year
                    },
                    timeout: 30000
                }).then(function successCallback(response) {
                    console.log("entro en $http" + JSON.stringify(response));
                    response.month = month;
                    defered.resolve(response);
                }, function errorCallback(error) {
                    console.log("ERROR en $http" + JSON.stringify(error));
                    defered.reject(error);
                });

                return promise;
            },
            checkTokenExpiration: function() {
                return moment().isAfter($window.sessionStorage.expiresAt);
            }
        };




    }) //END EndpointService
    .service('sharedValues', function() {

        var billingmonthly = [];

        return {
            getBillingMonthly: function() {
                return billingmonthly;
            },
            setBillingMonthly: function(value) {
                billingmonthly.push(value);
            }
        };
    });
