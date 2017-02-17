define(['app'],function  (app) {
	app.config(['$routeProvider',
		function  (route) {
		route.when("/mill",{
			controller:'IndexCtrl',
			templateUrl:'/html/index/index.html'
		})
		.when("/editor",{
			controller:'EditorCtrl',
			templateUrl:'/html/index/editor.html'
		})
		.otherwise({
			redirectTo:"/mill"
		});
	}]);
})