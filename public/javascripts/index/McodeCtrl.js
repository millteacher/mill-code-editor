define(['app', 'ace_config','treeContext'],function  (app,AceConfig,treeContext) {
	
	app.controller('McodeCtrl',
	['$scope','$http','$location'
	,function  (scope,http,location) {
		scope.title="这是我的Scope";
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);
		var crrentNode={};
		scope.editorTitile="content";

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
		/**
			生成代码
		*/
		scope.createCode=function  () {

			crrentNode[scope.editorTitile]=editor.getValue();
			http.post("/mcode/render_code",{data:crrentNode})
			.then(function  (generatCode) {
				var result=generatCode.data;
				if(result.state==1){
					sessionStorage.setItem("renderCode",result.data);
					//location.path("/#!/editor");
					window.location.href="/#!/editor";
				}else{
					console.error(result.message);
				}
				
			});
			
		}
		/**
			编辑配置
		*/
		scope.editConf=function  () {
			crrentNode.template=editor.getValue();
			scope.editorTitile="content";
			editor.setValue(crrentNode.content);
		}
		/**
			编辑模板
		*/
		scope.editTpl=function  () {
			crrentNode.content=editor.getValue();
			scope.editorTitile="template";
			editor.setValue(crrentNode.template);
		}/**
			保存模板和默认配置到数据库中
		*/
		scope.saveCode=function  () {
			//把当前编辑器中的代码赋值到crrentNode中
			crrentNode[scope.editorTitile]=editor.getValue();
			http.post("/mcode/update",{data:crrentNode})
			.then(function  (data) {
				alert(data.data);
			});
		}
		scope.itemClick=function  (node) {

			http.get("/mcode/get_row/"+node.id).
			then(function  (data) {
				//将当前读到的节点进行缓存
				//注意，content也就是我们的默认配置
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