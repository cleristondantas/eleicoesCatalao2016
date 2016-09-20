angular.module("eleicoesCatalao")
.controller("vereadoresCtrl", function ($scope, eleicoesAPI) {

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";

	$scope.loadVereadores = function (contato) {

		eleicoesAPI.getVereadores().success(function (data) {
			$scope.vereadores = data.candidatos;
			console.log(data);
		});
	};

	$scope.loadVereadores();

});