define(['app', 'ace_config','treeContext'],function  (app,AceConfig,treeContext) {
	
	app.controller('McodeCtrl',
	['$scope','$http'
	,function  (scope,http) {
		scope.title="这是我的Scope";
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);
		var crrentNode={};

		scope.nodeClick=function  (e,node) {
			crrentNode=node;
		}
		function saveCurrentFile (argument) {
			alert("保存当前的模板");
		}
		function  saveModelOrItem(isleaf) {
				var param={
					parent_id:crrentNode.id,
					is_leaf:isleaf,
					name:prompt("模块名称","")
				}
				http.post("/mcode/insert",{data:param})
				.then(function  (data) {
					alert(data);
				});


			}


		scope.itemClick=function  (node) {

			http.get("/mcode/get_row/"+node.id).
			then(function  (data) {
				//将当前读到的节点进行缓存
				crrentNode=data.data;
				if(!data.data)return;
				var content="";
				if(typeof(data.data.content)=="object"){
					content=angular.toJson(data.data.content);
				}else{
					content=data.data.content;
				};
				editor.setValue(content);
			});
			
		}
		//为右键菜单设置处理函数
		treeContext.setFuncs({
			saveNode:function  () {
				saveModelOrItem(0)
			},
			saveItem:function () {
				saveModelOrItem(1);
			},
			del:function  () {
				http.get('/mcode/delete_row/'+crrentNode.id)
				.then(function  (data) {
					alert(data.data);
				});
			}
		});
	}]);
});