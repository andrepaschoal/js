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

app.controller('CaController', ['$scope', '$http', function ($scope, $http) {

    $scope.title = 'Aprovação de Campanha';
    $scope.server = 'http://dotz-nest.reddrummer.com/api/';

    $scope.itemsPerPage = 10;
    $scope.page = 1;

    $scope.data = [];
    $scope.filter = {};
    $scope.order = '';

    $scope.setPage = function (page) {
        $scope.page = page;
    }

    $scope.setOrder = function (order) {
        $scope.order = (order == $scope.order ? '-' : '') + order;
    };

    $scope.load = function () {
        //$scope.data = $scope.getHardCodedCampaigns();
        //return;
        fetch(`${$scope.server}/campaigns`).then(data => data.json())
            .then(data => {
                console.log(`${data.length} campaigns retrieved`);
                $scope.data = data;
                $scope.$apply();
            }).catch(err => {
                console.dir(err, { depth: null });
            });
    }

    $scope.approve = function (campaign) {
        const user = localStorage.drumwaveStageUser;
        console.info(`Approving campaign ${campaign._id} - ${campaign.CampNome} by ${user}`);

        let url = 'http://dotz-nest.reddrummer.com/api//campaigns/5c196605e43e9f007a6364f7/approve';

        let fd = new URLSearchParams();
        fd.append('author', user);

        fetch(url, {
            method: 'POST',
            body: fd

        }).then(function (response) {
            console.log(response);

        }).catch(err => {
            console.log(err);
        });

        /*
        const url = `${$scope.server}/campaigns/${campaign._id}/approve`;
        const data = `author=${user}`;

        //$scope.alerts = [{ type: 'success', msg: 'Campanha aprovada com sucesso.' }];

        $http.put(url, data, { 'Content-Type': 'application/json' })
            .then(function (response) {
                $scope.data = response.data;
                $scope.alerts = [{ type: 'success', msg: 'Campanha aprovada com sucesso.' }];
            }), function (response) {
                $scope.alerts = [{ type: 'danger', msg: 'Erro ao Aprovar a campanha.' }];
            };

        return;
        */
        /*
        const options = {
            method: 'POST',
            mode: "no-cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "author": user })
        };

        let url = new URL(`${$scope.server}/campaigns/${campaign._id}/approve`);
        fetch(url, options)
            .then(response => {
                campaign.approvedAt = new Date();
                $scope.$apply();
                console.log(response);
            }).catch(err => {
                console.dir(err, { depth: null });
            });
            */
    }

    $scope.getHardCodedCampaigns = function () {
        /*
        let data = [];
        for (i = 0; i < 100; i++) {
            data.push({ id: i, title: `title ${i}`, partner: `partner ${i}` });
        }
        return data;
        */
    }
}]);

// bootstrap CampaignApprovalApp
angular.bootstrap(document.getElementById('ca-root'), ['CaApp']);
