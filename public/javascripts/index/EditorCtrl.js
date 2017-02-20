define(['app', 'ace_config'], function(app, AceConfig) {



	app.controller('EditorCtrl', ['$scope', '$http', function(scope, http) {

		var editor = AceConfig.aceConfig("editor");
		var editorNode = null;

		scope.title = "这是我的Scope";
		scope.rightBtnClick = function(e) {
			// alert(1111);
		}

		//ajax读取文件
		scope.itemClick = function(node) {
				editorNode = node;
				AceConfig.setFile(node); //在aceconfig中,缓存当前编辑的文件对象信息
				if (node.isFile) {
					http.post("/editor/readFile", {
							path: node.path
						})
						.then(function(data) {
							var content = typeof(data.data) == "string" ? data.data : angular.toJson(data.data, true)
							editor.setValue(content); //String
						});
				}
			}
			//ajax保存文件
		scope.saveFile = function() {
			if (!editorNode) {
				alert("没有选中的文件");
				return;
			}
			var obj = {
				path: editorNode.path,
				content: editor.getValue()
			}

			http.post("/editor/saveFile", obj)
				.then(function(data) {
					alert(data.data);
				});
		}

	}]);

});