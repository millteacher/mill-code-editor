define(['context', 'app'], function(c) {

	var contextFuncs={};
	//初始化
	context.init({
		fadeSpeed: 100,
		filter: function($obj) {},
		above: 'auto',
		preventDoubleContext: true,
		compress: false
	});
	context.attach('.ng-binding.ng-scope.branch', [{
		header: '模块管理'
	},{
		text: '添加模块',
		action: function  (e,txt) {
			contextFuncs.saveNode(txt);
		}	
	},{
		text: '添加条目',
		action: function  (e,txt) {
			contextFuncs.saveItem(txt);
		}	
	},{
		text: '删除',
		action: function  (e,txt) {
			contextFuncs.del(txt);
		}	
	}])

	function setFuncs (funcs) {
		contextFuncs=funcs;
	}


	//设置右键菜单
	context.attach('.ng-binding.ng-scope.leaf', [{
		header: '条目管理'
	}, {
		text: '删除',
		action:function  (e,txt) {
			contextFuncs.del(txt);
		}
	}, {
		divider: true
	}, {
		header: '第二个标题'
	}]);
	return {
		setFuncs:setFuncs
	}

});