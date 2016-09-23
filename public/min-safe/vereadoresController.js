angular.module("eleicoesCatalao")
.controller("vereadoresCtrl", ['$scope', 'eleicoesAPI', function ($scope, eleicoesAPI) {

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";
	$scope.carregando = true;

	$scope.loadVereadores = function (contato) {

		eleicoesAPI.getVereadores().success(function (data) {
			$scope.vereadores = data.candidatos;
			$scope.carregando = false;
		});
	};

	$scope.loadVereadores();

}]);