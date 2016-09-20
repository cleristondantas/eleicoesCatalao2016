angular.module("eleicoesCatalao")
.controller("detalheCandidatoCtrl", function ($scope, $routeParams, eleicoesAPI) {

	$scope.id = $routeParams.id;
	console.log($scope.id);

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";

	$scope.loadDetalhe = function (id) {

		eleicoesAPI.getDetalhe(id).success(function (data) {
			$scope.detalhe = data;
		});
	};

	$scope.loadDetalhe($scope.id);


	$scope.getTotalBens = function(){
	    var total = 0;

	    for(var i = 0; i < $scope.detalhe.bens.length; i++){

	        var bem = $scope.detalhe.bens[i];

	        total += bem.valor;
	    }
	    return total;
	}

});