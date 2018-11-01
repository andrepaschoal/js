// retrieves the module
angular.module('CaApp', []).controller('CaController', function ($scope) {
    $scope.title = 'Aprovação de Campanha';

    /*
    $scope.campaigns = [
        { id: 1, title: 'Julietto', partner: 'Julietto', approvedBy: null, approvalDate: null, sfId: null },
        { id: 2, title: 'Banco do Brasil', partner: 'Banco do Brasil', approvedBy: 'Josemando Sobral', approvalDate: '20/10/2018', sfId: null },
        { id: 3, title: 'Prezunic', partner: 'Prezunic', approvedBy: null, approvalDate: null, sfId: null },
        { id: 4, title: 'ALE', partner: 'ALE', approvedBy: null, approvalDate: null, sfId: null },
        { id: 5, title: 'BIBI', partner: 'BIBI', approvedBy: 'José Marconi', approvalDate: '12/09/2018', sfId: null },
    ];
    */

    fetch('https://raw.githubusercontent.com/andrepaschoal/js/master/campaigns.json').then(data => data.json()).then(data => {
        $scope.campaigns = data;
        $scope.$apply();
    });

});


// bootstrap CampaignApprovalApp
angular.bootstrap(document.getElementById('ca-root'), ['CaApp']);
