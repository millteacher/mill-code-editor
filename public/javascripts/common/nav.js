define(['app'],function  (app) {
	app.directive('navMill',function  ($templateCache) {
		return {
			restrict:"EA",
			templateUrl:"/html/common/nav.html",
			replace:true,
			
			scope:{//隔离作用域,=双向绑定@单向引用,作为字符串&方法引用
				data:"=datanav"
			},
			
		};
	});
});