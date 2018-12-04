const server = 'http://dotz-nest.reddrummer.com/api/';

// retrieves the module
let app = angular.module('CaApp', []);

app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});

app.controller('CaController', function ($scope) {

    $scope.title = 'Aprovação de Campanha';

    $scope.data = [];
    $scope.filter = {};

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

    $scope.load = function () {
        fetch(`${server}/campaigns`).then(data => data.json())
            .then(data => {
                console.log(data);
                $scope.data = data;
                //$scope._data = this.getHardCodedCampaigns();
                //$scope.data = $scope.page.paginate($scope._data);
                $scope.$apply();
            }).catch(err => {
                console.dir(err, { depth: null });
            });
    }

    $scope.approve = function (campaign) {
        console.info(`Approving campaign ${campaign._id} - ${campaign.CampNome}`);
        const options = {
            method: 'POST',
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: {
                "author": 'andre.paschoal@reddrummer.com'
            }
        };

        fetch(`${server}/campaigns/${campaign._id}/approve`, options)
            .then(response => {
                campaign.approvedAt = new Date();
                console.log(response);
            }).catch(err => {
                console.dir(err, { depth: null });
            });

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
