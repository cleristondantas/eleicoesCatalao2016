angular.module("eleicoesCatalao")
.controller("prefeitosCtrl", function ($scope, eleicoesAPI) {

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";
	$scope.carregandoP = true;
	$scope.carregandoV = true;

	$scope.loadPrefeitos = function () {

		eleicoesAPI.getPrefeitos().success(function (data) {
			$scope.prefeitos = data.candidatos;
			$scope.carregandoP = false;
		});
	};

	$scope.loadVicePrefeitos = function () {

		eleicoesAPI.getVicePrefeitos().success(function (data) {
			$scope.vicePrefeitos = data.candidatos;
			$scope.carregandoV = false;
		});
	};

	$scope.loadPrefeitos();
	$scope.loadVicePrefeitos();

});