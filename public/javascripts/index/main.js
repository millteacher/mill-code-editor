//require管理css有两步,了解就好，css的依赖还是建议在页面上直接写

require.config({

	paths:{
		"bootstrap":"/bootstrap/dist/js/bootstrap",
		"angular":"/angular/angular",
		"jquery":"/jquery/dist/jquery",
		"nav":"/javascripts/common/nav",
		"navCtrl":"/javascripts/common/navCtrl",
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
	"app",
	"nav",
	"navCtrl",

],function  (boot,angular) {
	angular.bootstrap(document,['indexApp']);
});