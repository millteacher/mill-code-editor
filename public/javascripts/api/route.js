define(['app'],function  (app) {
	app.config(['$routeProvider',
		function  (route) {
		route.when("/table/:page",{
			controller:'TableCtrl',
			templateUrl:'/html/api/table.html'
		})
		.when("/field/:table_name",{
			controller:'FieldCtrl',
			templateUrl:'/html/api/field.html'
		})
		.when("/fieldEditor/:field_id",{
			controller:'FieldEditorCtrl',
			templateUrl:'/html/api/fieldEditor.html'
		})
		.otherwise({
			redirectTo:"/table/1"
		});
	}]);
})