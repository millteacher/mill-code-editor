define(['app'],function  (app) {
	app.service('arr2tree',function  () {
		this.doConve=function  (arr) {
			if(!arr) throw "参数不能为空";
			if(!Array.isArray(arr)) throw "参数必须是数组";
			var obj ={
				0:{name:"root",child:[]}
			}
			arr.forEach(function  (item,index,arr) {
				item.child=[];
				obj[item.id]=item;
			});
			arr.forEach(function  (item,index,arr) {
				if(obj[item.parent_id])
				obj[item.parent_id].child.push(item);
			});
			return obj[0];
		};
	});
});