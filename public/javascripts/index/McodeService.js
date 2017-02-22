define(['app'],function  (app) {
	app.service('McodeService',['$http',function  (http) {
		this.insertData=function  () {
			http.post('/mcode/insert',{data:{
				name:"maven",
				content:"",
				template:"",
				parent_id:1,
				is_leaf:0
			}}).then(function  (data) {
				alert(data.data);
			})
		}

		this.updateData=function  () {
			http.post('/mcode/update',{data:{
				name:"nexus",
				content:"",
				template:"",
				parent_id:1,
				is_leaf:0,
				id:7
			}}).then(function  (data) {
				alert(data.data);
			})
		}
	}])
});