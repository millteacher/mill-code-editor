define(['app'],function  (app) {
	app.controller('navCtrl',['$scope',function  (scope) {
		scope.navdata={
			brand:"mill",
			left:[
				{url:"http://www.baidu.com",val:"百度"},
				{
					val:"尚学堂",
					dropdown:true,//{}==false
					items:[
						{url:"/users",val:"web前端"},{},
						{url:"http://www.qq.com",val:"java学院"},
						{url:"http://www.qq.com",val:"大数据学院"}
					]
				},
				{url:"http://www.baidu.com",val:"新浪"}
			],
			form:{
				btnVal:"搜索",
				inputVal:"angular教程",
				onSubmit:function  () {
					alert(this.inputVal);
				}
			},
			right:[
				{
					url:"http://www.163.com",
					val:"网易"
				},
				{
					val:"编程语言",
					dropdown:true,
					items:[
						{url:"http://www.w3school.com.cn",val:"web"},
						{url:"http://www.w3school.com.cn",val:"java"},
						{url:"http://www.w3school.com.cn",val:"php"},{},
						{url:"http://www.w3school.com.cn",val:"c#"},
						{url:"http://www.w3school.com.cn",val:"vb"},
						{url:"http://www.w3school.com.cn",val:"c++"},
					]
				}
			]
		}
	
	}]);
})