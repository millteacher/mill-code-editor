define(['app'],function  (app) {
	app.filter('limit',function  () {
		return function  (arr,page) {
			if(Array.isArray(arr))
			return arr.slice((page-1)*10,page*10);
		}
		
	});
})