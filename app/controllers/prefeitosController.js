angular.module("eleicoesCatalao")
.controller("prefeitosCtrl", function ($scope, eleicoesAPI) {

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";

	$scope.loadPrefeitos = function (contato) {

		eleicoesAPI.getPrefeitos().success(function (data) {
			$scope.prefeitos = data.candidatos;
			console.log(data);
		});
	};

	$scope.loadPrefeitos();

});