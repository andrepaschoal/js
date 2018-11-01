// retrieves the module
angular.module('CaApp', []).controller('CaController', function ($scope) {
    $scope.title = 'Aprovação de Campanha'
});


// bootstrap CampaignApprovalApp
angular.bootstrap(document.getElementById('ca-root'), ['CaApp']);
