angular.module("eleicoesCatalao", ["ngMaterial", "ngRoute"])
.controller('myCtrl', ['$scope', '$mdTheming', function($scope, $mdTheming) {
    var removeFunction = $mdTheming.setBrowserColor({
      theme: 'myTheme', // Default is 'default'
      palette: 'accent', // Default is 'primary', any basic material palette and extended palettes are available
      hue: '200' // Default is '800'
    });

    $scope.$on('$destroy', function () {
      removeFunction(); // COMPLETELY removes the browser color
    })
  }])
angular.module("eleicoesCatalao").value("config", {
	baseUrl: "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/",
	cidade: "93017",
	ano: "2016"
});
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

angular.module("eleicoesCatalao").factory("eleicoesAPI", ['$http', 'config', function ($http, config) {

	var _getVereadores = function () {
		// http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/93017/2/11/candidatos
		return $http.get(config.baseUrl + "candidatura/listar/" + config.ano + "/" + config.cidade + "/2/13/candidatos");
	};

	var _getPrefeitos = function () {
		return $http.get(config.baseUrl + "candidatura/listar/" + config.ano + "/" + config.cidade + "/2/11/candidatos");
	};

	var _getDetalhe = function (id) {
		// http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2016/93017/2/candidato/90000008472
		// return config.baseUrl + "candidatura/buscar/" + config.ano + "/" + config.cidade + "/2/candidato/" + id;

		return $http.get(config.baseUrl + "candidatura/buscar/" + config.ano + "/" + config.cidade + "/2/candidato/" + id);
	};

	var _getGastos = function (id, nr) {
		return $http.get(config.baseUrl + "prestador/consulta/2/" + config.ano + "/" + config.cidade + "/11/"+ nr +"/"+ nr +"/" + id);
	};

	var _getFoto = function (id) {
		// http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/90000008472?x=1473735600000
		return $http.get(config.baseUrl + "candidatura/buscar/foto/2/" + id);
	};

	return {
		getVereadores: _getVereadores,
		getPrefeitos: _getPrefeitos,
		getDetalhe: _getDetalhe,
		getFoto: _getFoto,
		getGastos: _getGastos
	};
}]);

angular.module("eleicoesCatalao")
.controller("prefeitosCtrl", ['$scope', 'eleicoesAPI', function ($scope, eleicoesAPI) {

	$scope.urlFoto = "http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/foto/2/";
	$scope.carregando = true;

	$scope.loadPrefeitos = function (contato) {

		eleicoesAPI.getPrefeitos().success(function (data) {
			$scope.prefeitos = data.candidatos;
			$scope.carregando = false;
		});
	};

	$scope.loadPrefeitos();

}]);
angular.module("eleicoesCatalao").config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when("/vereadores", {
		templateUrl: "app/views/vereadores.html",
		controller: "vereadoresCtrl",
		// resolve: {
		// 	contatos: function (contatosAPI) {
		// 		return contatosAPI.getContatos();
		// 	},
		// 	operadoras: function (operadorasAPI) {
		// 		return operadorasAPI.getOperadoras();
		// 	}
		// }
	});
	$routeProvider.when("/prefeitos", {
		templateUrl: "app/views/prefeitos.html",
		controller: "prefeitosCtrl",
		// resolve: {
		// 	operadoras: function (operadorasAPI) {
		// 		return operadorasAPI.getOperadoras();
		// 	}
		// }
	});
	$routeProvider.when("/candidato/:id/:numero", {
		templateUrl: "app/views/detalheCandidato.html",
		controller: "detalheCandidatoCtrl",
		// resolve: {
		// 	contato: function (contatosAPI, $route) {
		// 		return contatosAPI.getContato($route.current.params.id);
		// 	}
		// }
	});
	$routeProvider.when("/home/", {
		templateUrl: "app/views/home.html",
		// controller: "detalheCandidatoCtrl",
		// resolve: {
		// 	contato: function (contatosAPI, $route) {
		// 		return contatosAPI.getContato($route.current.params.id);
		// 	}
		// }
	});
	$routeProvider.otherwise({redirectTo: "/home"});
}]);

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