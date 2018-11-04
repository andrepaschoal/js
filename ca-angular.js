// retrieves the module
angular.module('CaApp', ['ui.bootstrap']).controller('CaController', function ($scope) {
    $scope.title = 'Aprovação de Campanha';

    // pagination
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

    fetch('https://raw.githubusercontent.com/andrepaschoal/js/master/campaigns.json')
        .then(data => data.json())
        .then(data => {

            //$scope._data = data;
            $scope._data = this.getHardCodedCampaigns();
            $scope.data = $scope.page.paginate($scope._data);
            $scope.$apply();
        });

    $scope.paginate = function () {
        $scope.data = $scope.page.paginate($scope._data);
    }

    $scope.sort = function (by) {
        console.log(`sorting by ${by}... previous sort ${JSON.stringify(this.sorting)}`);
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

    this.getHardCodedCampaigns = function () {
        let data = [];
        for (i = 0; i < 100; i++) {
            data.push({ id: i, title: `title ${i}`, partner: `partner ${i}` });
        }
        return data;

        return [
            { id: 1, title: 'Julietto', partner: 'Julietto', approvedBy: null, approvalDate: null, sfId: null },
            { id: 2, title: 'Banco do Brasil', partner: 'Banco do Brasil', approvedBy: 'Josemando Sobral', approvalDate: '20/10/2018', sfId: null },
            { id: 3, title: 'Prezunic', partner: 'Prezunic', approvedBy: null, approvalDate: null, sfId: null },
            { id: 4, title: 'ALE', partner: 'ALE', approvedBy: null, approvalDate: null, sfId: null },
            { id: 5, title: 'BIBI', partner: 'BIBI', approvedBy: 'José Marconi', approvalDate: '12/09/2018', sfId: null },
            { id: 1, title: 'Julietto', partner: 'Julietto', approvedBy: null, approvalDate: null, sfId: null },
            { id: 2, title: 'Banco do Brasil', partner: 'Banco do Brasil', approvedBy: 'Josemando Sobral', approvalDate: '20/10/2018', sfId: null },
            { id: 3, title: 'Prezunic', partner: 'Prezunic', approvedBy: null, approvalDate: null, sfId: null },
            { id: 4, title: 'ALE', partner: 'ALE', approvedBy: null, approvalDate: null, sfId: null },
            { id: 5, title: 'BIBI', partner: 'BIBI', approvedBy: 'José Marconi', approvalDate: '12/09/2018', sfId: null },
            { id: 1, title: 'Julietto', partner: 'Julietto', approvedBy: null, approvalDate: null, sfId: null },
            { id: 2, title: 'Banco do Brasil', partner: 'Banco do Brasil', approvedBy: 'Josemando Sobral', approvalDate: '20/10/2018', sfId: null },
            { id: 3, title: 'Prezunic', partner: 'Prezunic', approvedBy: null, approvalDate: null, sfId: null },
            { id: 4, title: 'ALE', partner: 'ALE', approvedBy: null, approvalDate: null, sfId: null },
            { id: 5, title: 'BIBI', partner: 'BIBI', approvedBy: 'José Marconi', approvalDate: '12/09/2018', sfId: null },
        ];
    }
});

// bootstrap CampaignApprovalApp
angular.bootstrap(document.getElementById('ca-root'), ['CaApp']);
