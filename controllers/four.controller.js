(function() {
    'use strict';

    angular
        .module('KendoDemos')
        .controller('fourController', fourController);

    fourController.$inject = ['DataService']

    function fourController(DataService) {
        var vm = this;
        vm.detailGridOptions = detailGridOptions;

        DataService.getVenueData().then(function(data) {
            console.log('foursquare: ', data);
        })

        vm.mainGridOptions = {
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                },
                pageSize: 5,
                serverPaging: true,
                serverSorting: true
            },
            ""
            ""
            sortable: true,
            pageable: true,
            dataBound: function() {
                this.expandRow(this.tbody.find("tr.k-master-row").first());
            },
            columns: [{
                field: "FirstName",
                title: "First Name",
                width: "120px"
            }, {
                field: "LastName",
                title: "Last Name",
                width: "120px"
            }, {
                field: "Country",
                width: "120px"
            }, {
                field: "City",
                width: "120px"
            }, {
                field: "Title"
            }]
        };

        function detailGridOptions(dataItem) {
            return {
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 5,
                    filter: {
                        field: "EmployeeID",
                        operator: "eq",
                        value: dataItem.EmployeeID
                    }
                },
                scrollable: false,
                sortable: true,
                pageable: true,
                columns: [{
                    field: "OrderID",
                    title: "ID",
                    width: "56px"
                }, {
                    field: "ShipCountry",
                    title: "Ship Country",
                    width: "110px"
                }, {
                    field: "ShipAddress",
                    title: "Ship Address"
                }, {
                    field: "ShipName",
                    title: "Ship Name",
                    width: "190px"
                }]
            };
        }
    }

})();