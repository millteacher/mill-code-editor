define(['app'],function  (app) {
	app.controller('FieldCtrl',['$scope','$http','$routeParams',
		function  (scope,http,routeParams) {
		http.get('/api/get_all/mill_field?key=getAllForTable&arg[]='+routeParams.table_name)
		.then(function  (data) {
			scope.data=data.data;
		});
	}]);
});