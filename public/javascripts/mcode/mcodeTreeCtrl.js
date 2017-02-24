define(['app'],function  (app) {
	app.controller('mcodeTreeCtrl',['$scope','$http','arr2tree'
		,function  (scope,http,arr2tree) {

		http.get("/mcode/get_all")
		.then(function  (data) {
			var tree=arr2tree.doConve(data.data);
			scope.dataForTheTree =tree;
	
		});
	
		
		//树的初始化配置
		scope.treeOptions = {
		    nodeChildren: "child",
		    dirSelectable: true,
		    isLeaf:function (node) {
		    	return node.is_leaf;
		    },
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		}
	}]);
});