(function() {
    'use strict';

    angular
        .module('KendoDemos')
        .controller('MyCtrl', MyCtrl);

    MyCtrl.$inject = ['DataService']

    function MyCtrl(DataService) {
        var vm = this;
        vm.getPicture = getPicture;
        vm.removeItem = removeItem;
        vm.alphabetical = alphabetical;
        vm.recomended = recomended;
        vm.searchTerm = 'london',
        vm.search = search
        vm.results = [];

        activate();
        ////////////

        function activate(){
            search();
        }

        function getPicture(photos){
            var photoItem = photos.groups[0].items[0];
            var url = photoItem.prefix + '100x100' + photoItem.suffix;
            return url;
        }

        function removeItem(){
            vm.results.pop();
            console.log(vm.results);
        }

        function alphabetical(){
            vm.results.sort(alphabeticalCompare);

            function alphabeticalCompare(r1, r2){
                if(r1.venue.name < r2.venue.name) return -1;
                else return 1;
            }
        }

        function recomended(){
            vm.results.sort(recomendedCompare);

            function recomendedCompare(r1, r2){
                return (r2.venue.rating - r1.venue.rating)*10;
            }
        }

        function search(searchItem){
            DataService.getVenueData(vm.searchTerm).then(function(response){
                console.log(response.groups[0].items)
                vm.results = response.groups[0].items;
            })
        }
    }

})();