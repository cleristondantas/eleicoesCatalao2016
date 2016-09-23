angular.module("eleicoesCatalao")
.controller("detalheCandidatoCtrl", ['$scope', '$routeParams', 'eleicoesAPI', function ($scope, $routeParams, eleicoesAPI) {

	$scope.id = $routeParams.id;
	$scope.numero = $routeParams.numero;

	$scope.isVereador = false;

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";

	$scope.init = function () {
		$scope.loadDetalhe($scope.id);
		$scope.gastos($scope.id, $scope.numero)
	}

	$scope.loadDetalhe = function (id) {

		eleicoesAPI.getDetalhe(id).success(function (data) {
			$scope.detalhe = data;
			if($scope.detalhe.cargo.codigo == 11) {
				$scope.isVereador = true;
			}
		});
	};


	$scope.gastos = function (id, nropartido) {

		eleicoesAPI.getGastos(id, nropartido).success(function (data) {
			$scope.gastos = data;
		});
	};


	$scope.getTotalBens = function() {
	    var total = 0;
	    for(var i = 0; i < $scope.detalhe.bens.length; i++){
	        var bem = $scope.detalhe.bens[i];
	        total += bem.valor;
	    }
	    return total;
	}

	$scope.getTotalGasto = function() {
	    var total = 0;
	    for(var i = 0; i < $scope.gastos.concentracaoDespesas.length; i++){
	        var bem = $scope.gastos.concentracaoDespesas[i];
	        total += bem.valor;
	    }
	    return total;
	}

	$scope.getTotalForn = function() {
	    var total = 0;
	    for(var i = 0; i < $scope.gastos.rankingFornecedores.length; i++){
	        var bem = $scope.gastos.rankingFornecedores[i];
	        total += bem.valor;
	    }
	    return total;
	}

	$scope.init();

}]);
