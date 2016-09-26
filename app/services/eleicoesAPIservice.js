angular.module("eleicoesCatalao").factory("eleicoesAPI", function ($http, config) {

	var _getVereadores = function () {
		// http://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/93017/2/11/candidatos
		return $http.get(config.baseUrl + "candidatura/listar/" + config.ano + "/" + config.cidade + "/2/13/candidatos");
	};

	var _getPrefeitos = function () {
		return $http.get(config.baseUrl + "candidatura/listar/" + config.ano + "/" + config.cidade + "/2/11/candidatos");
	};

	// ttp://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2016/93017/2/12/candidatos

	var _getVicePrefeitos = function () {
		return $http.get(config.baseUrl + "candidatura/listar/" + config.ano + "/" + config.cidade + "/2/12/candidatos");
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
		getVicePrefeitos: _getVicePrefeitos,
		getDetalhe: _getDetalhe,
		getFoto: _getFoto,
		getGastos: _getGastos
	};
});
