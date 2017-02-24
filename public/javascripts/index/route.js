define(['app'],function  (app) {
	app.config(['$routeProvider',
		function  (route) {
		route.when("/mcode",{
			controller:'McodeCtrl',
			templateUrl:'/html/index/mcode.html'
		})
		.when("/editor",{
			controller:'EditorCtrl',
			templateUrl:'/html/index/editor.html'
		})
		.otherwise({
			redirectTo:"/mcode"
		});
	}]);
})