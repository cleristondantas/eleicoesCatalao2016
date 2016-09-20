angular.module("eleicoesCatalao").config(function ($routeProvider) {
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
	$routeProvider.when("/candidato/:id", {
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
});