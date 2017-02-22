define(['app', 'ace_config'], function(app, AceConfig) {



	app.controller('EditorCtrl', ['$scope', '$http','McodeService' ,function(scope, http,McodeService) {
		//编辑框的实例对象
		var editor = AceConfig.aceConfig("editor",saveCurrentFile);
		var editorNode = null;//当前编辑的节点(文件)

		scope.title = "这是我的Scope";
		// ace编辑框右键点击事件
		scope.rightBtnClick = function(e) {
			// alert(1111);
		}
		scope.testDb=function  () {
			McodeService.updateData();
		}
		//ajax读取文件
		scope.itemClick = function(node) {
				editorNode = node;
				AceConfig.setFile(node); //在aceconfig中,缓存当前编辑的文件对象信息
				if (node.isFile) {
					http.post("/editor/readFile?time="+(new Date()).getTime(), {
							path: node.path
						})
						.then(function(data) {
							var content = typeof(data.data) == "string" ? data.data : angular.toJson(data.data, true)
							editor.setValue(content); //String
						});
				}
			}

		function saveCurrentFile() {
			if (!editorNode) {
				alert("没有选中的文件");
				return;
			}
			var obj = {//保存文件需要用到的对象
				path: editorNode.path,
				content: editor.getValue()
			}
			//异步调用保存文件的接口
			http.post("/editor/saveFile", obj)
				.then(function(data) {
					alert(data.data);
				});
		}
			//ajax保存文件
		scope.saveFile = saveCurrentFile;

	}]);

});