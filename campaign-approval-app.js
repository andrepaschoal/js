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
    $scope.order = '';

    $scope.setOrder = function (order) {
        $scope.order = order;
        $scope.apply();
    };

    $scope.load = function () {
        $scope.data = $scope.getHardCodedCampaigns();
        return;
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

        let url = new URL(`${server}/campaigns/${campaign._id}/approve`),
            params = { author: 'andre.paschoal@reddrummer.com' };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url, options)
            .then(response => {
                campaign.approvedAt = new Date();
                $scope.$apply();
                console.log(response);
            }).catch(err => {
                console.dir(err, { depth: null });
            });

    }

    $scope.getHardCodedCampaigns = function () {
        
        let data = [];
        for (i = 0; i < 100; i++) {
            data.push({ id: i, title: `title ${i}`, partner: `partner ${i}` });
        }
        return data;
    }
});

// bootstrap CampaignApprovalApp
angular.bootstrap(document.getElementById('ca-root'), ['CaApp']);
