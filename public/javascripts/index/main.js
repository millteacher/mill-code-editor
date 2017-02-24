//require管理css有两步,了解就好，css的依赖还是建议在页面上直接写

require.config({

	paths:{
		"bootstrap":"/bootstrap/dist/js/bootstrap",
		"ace":"/ace/build/src/ace",
		"ext-language":"/ace/build/src/ext-language_tools",
		"angular":"/angular/angular",
		"angular-route":"/angular-route/angular-route",
		"context":"/context/index",
		"angular-tree":"/angular-tree-control/angular-tree-control",
		"jquery":"/jquery/dist/jquery",
		"nav":"/javascripts/common/nav",
		"navCtrl":"/javascripts/common/navCtrl",
		"arr2tree":"/javascripts/common/arr2tree",
		"mcodeTreeCtrl":"/javascripts/mcode/mcodeTreeCtrl",
		"treeContext":"/javascripts/mcode/treeContext",
	},
	shim:{
		"bootstrap":{
			exports:"bootstrap",
			deps:[
			"jquery",
			"css!/bootstrap/dist/css/bootstrap.css"//2,依赖的地方用css!路径
			]
		},
		"angular":{
			exports:"angular",
			deps:[
			"bootstrap",
			]
		},
		"context":{
			exports:"context",
			deps:[
			"css!/context.standalone/index.css",
			]
		},
		"angular-route":{
			exports:"angular-route",
			deps:[
			"angular",
			]
		},
		"angular-tree":{
			exports:"angular-tree",
			deps:[
			"angular",
			"css!/angular-tree-control/css/tree-control.css",
			"css!/angular-tree-control/css/tree-control-attribute.css",
			]
		},"ace":{
			exports:"ace",
			
		},"ext-language":{
			exports:"ext-language",
			deps:[
				"ace"
			]
			
		},
	},
	map:{//1,引入require-css
		'*':{
			'css':'/require-css/css.js'
		}
	}
});

require([
	"bootstrap",
	"angular",
	"context",
	"angular-route",
	"angular-tree",
	"route",
	"rightClickDire",
	"treeContext",
	"McodeService",
	"arr2tree",
	"McodeCtrl",
	"mcodeTreeCtrl",
	"EditorCtrl",
	"treeCtrl",
	"app",
	"nav",
	"navCtrl",
	"ace",
	"ext-language",
	"ace_config",

],function  (boot,angular) {
	angular.bootstrap(document,['indexApp']);
	
	
});