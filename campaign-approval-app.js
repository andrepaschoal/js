var app = angular.module('dotzCampaign', ['ui.bootstrap']);

app.controller('approvalCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.filters = {
        checkboxModel: {
            onlyApproved: false
        }
    };

    $scope.fetch = function () {
        const urlToService = "http://dotz-nest.reddrummer.com/api/campaigns";

        $http.get(urlToService)
            .then(function (response) {
                $scope._data = response.data;
                $scope.data = response.data;
                $scope.data = $scope.page.paginate($scope.data);
            });
    };

    $scope.page = {
        current: 1,
        rows: 10,

        paginate: function (data) {
            if (data) {
                let index = (this.current - 1) * this.rows;
                return data.slice(index, index + this.rows);
            }
        }
    };

    $scope.paginate = function () {
        $scope.data = $scope.page.paginate($scope._data);
    }

    $scope.sort = function (by) {
        let asc = true;

        if (this.sorting && this.sorting.by === by) {
            asc = !this.sorting.asc;
        }

        const op = (asc ? 1 : -1);

        this._data.sort(function (a, b) {
            if (a[by] > b[by]) {
                return 1 * op;
            } else if (a[by] < b[by]) {
                return -1 * op;
            }
            return 0;
        });
        this.sorting = { by: by, asc: asc };

        this.data = this.page.paginate(this._data);
    }

    $scope.approval = function (campaing) {

        const url = 'puturl';
        const data = 'parameters';
        const config = 'contenttype';

        // TODO Remover essa linha quando possuir a URL correta do serviço
        $scope.alerts = [{ type: 'success', msg: 'Campanha aprovada com sucesso.' }];

        // $http.put(url, data, config)
        //     .then(function (response) {
        //         $scope.data = response.data;
        //         $scope.alerts = [{ type: 'success', msg: 'Campanha aprovada com sucesso.' }];
        //     }), function (response) {
        //         $scope.alerts = [{ type: 'danger', msg: 'Erro ao Aprovar a campanha.' }];
        //     };
    }

    $scope.filter = function () {
        const urlToServiceApproved = "http://dotz-nest.reddrummer.com/api/campaigns?approvedAtNull=" + $scope.filters.checkboxModel.onlyApproved;

        $http.get(urlToServiceApproved)
            .then(function (response) {
                $scope._data = response.data;
                $scope.data = response.data;
                $scope.data = $scope.page.paginate($scope.data);
            });
    }


}]);
