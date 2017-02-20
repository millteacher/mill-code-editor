define(['app'],function  (app) {
	app.directive('myRightClick',function  ($parse) {
		return {
			link:function  (scope,element,attrs) {
				//$parse将字符串解析成函数，解析后的函数，接收两个参数,(scope,变量对象)
				var fn=$parse(attrs.myRightClick);
				element.bind("contextmenu",function  (event) {
					scope.$apply(function  () {
						event.preventDefault();//取消默认事件
						fn(scope,{$event:event});
					});
				});

			}
		}
	})
});