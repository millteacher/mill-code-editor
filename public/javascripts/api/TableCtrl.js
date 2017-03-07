define(['app'],function  (app) {
	app.controller('TableCtrl',['$scope','$http','$routeParams',
		function  (scope,http,routeParams) {
		scope.page=routeParams.page;
		http.get('/api/get_all/mill_table')
		.then(function  (data) {
			scope.data=data.data;
			scope.pages=[];
			for (var i = 1; i <= Math.ceil(scope.data.length/10); i++) {
				scope.pages.push(i);
			};
		});
		scope.page=1;

		scope.toPage=function  (num) {
			var currentPage=scope.page+num;
			if(currentPage<1){
				scope.page=1;
			}else if(currentPage>=scope.pages.length){
				scope.page=scope.pages.length;
			}else{
				scope.page=currentPage;
			}

		}
		scope.doPage=function  (num) {
			scope.page=num;
		}
	}]);
})