define(['app'],function  (app) {
	app.controller('FieldEditorCtrl',['$scope','$http',
		function  (scope,http) {
		scope.validateType=2;
		scope.validateName="aa";
		//添加验证规则
		scope.addValidateName=function  () {
			http.post("/api/doSql",{
				data:[scope.validateName,scope.validateType],
				table:"mill_validate",
				key:"insertName"
			}).then(function  (data) {
				alert(data.data);
			});
		}
	}]);
});