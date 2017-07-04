(function() {
    'use strict';

    angular
        .module('KendoDemos')
        .factory('DataService', DataService);

    DataService.$inject = ['$http', '$q'];

    function DataService($http, $q) {
        var service = {
            getVenueData: getVenueData,
            getMainMenu: getMainMenu,
            getData: getData,
            search: search,
            getUserData: getUserData,
            getCalloutData: getCalloutData,
            filterSearch: filterSearch,
            doGet: doGet,
            doPost: doPost,
            doPut: doPut,
            doDelete: doDelete
        };

        return service;

        ////////////

        function getVenueData() {
            var def = $q.defer(),
                url = 'https://api.foursquare.com/v2/venues/explore?near=london&oauth_token=CT0R0Q0KHYN23UNMR5SBZC22C4QCBXNOXQ0KYGQG4A3PGVSC&v=20170704';

            $http.get(url).then(function(response) {
                def.resolve(response.data.response);
            });

            return def.promise;
        }

        function getMainMenu() {
            var def = $q.defer();

            $http.get(appApi.apiUrl + '/fullmenu').then(function(response) {
                def.resolve(response.data);
            });

            return def.promise;
        }

        function search(requestBody) {
            var def = $q.defer();
            var url = appApi.apiUrl + '/search';
            $http.post(url, requestBody).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });

            return def.promise;
        }

        function getUserData() {
            var def = $q.defer(),
                url = appApi.apiUrl + '/Welcome/all';

            $http.get(url).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });
            return def.promise;
        }

        function getCalloutData(type) {
            var def = $q.defer(),
                url = appApi.apiUrl + '/Callout/' + type + '/A';

            var request = $http({
                method: 'get',
                url: url,
                timeout: def.promise
            });

            var promise = request.then(
                function(response) {
                    return (response.data);
                }
            );

            promise.abort = function() {
                def.resolve();
            };

            return promise;
        }

        function filterSearch(requestBody) {
            var def = $q.defer();
            var url = appApi.apiUrl + '/filterSearch';
            $http.post(url, requestBody).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });

            return def.promise;
        }

        //Replace most of the above methods with doPost/doGet or doPut
        function getData(params) {
            var def = $q.defer(),
                mapping = UtilService.buildMapping(params),
                url = appApi.apiUrl + '/restui?cmapping=' + mapping;
            $http.get(url).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });

            return def.promise;
        }

        function doPost(endPoint, requestBody, useHandlerService) {
            var def = $q.defer(),
                url = (useHandlerService ? appApi.handlerApiUrl : appApi.apiUrl) + endPoint;
            $http.post(url, requestBody).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });
            return def.promise;
        }

        function doPut(endPoint, requestBody, useHandlerService) {
            var def = $q.defer(),
                url = (useHandlerService ? appApi.handlerApiUrl : appApi.apiUrl) + endPoint;
            $http.put(url, requestBody).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });
            return def.promise;
        }

        function doGet(endPoint, useHandlerService) {
            var def = $q.defer(),
                url = (useHandlerService ? appApi.handlerApiUrl : appApi.apiUrl) + endPoint;
            $http.get(url).then(function(response) {
                def.resolve(response.data);
            }, function(response) {
                def.reject(response);
            });
            return def.promise;
        }

        function doDelete(endPoint, useHandlerService) {
            var url = (useHandlerService ? appApi.handlerApiUrl : appApi.apiUrl) + endPoint;
            return $http.delete(url);
        }
    }

})();