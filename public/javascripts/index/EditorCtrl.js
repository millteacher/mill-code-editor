define(['app'],function  (app) {


	function aceConfig (ace) {
		var editor = ace.edit("editor");
		editor.setOptions({
			enableBasicAutocompletion:true,
			enableSnippets:true,
			enableLiveAutocompletion:true
		});

		editor.setTheme("ace/theme/monokai");
		editor.getSession().setMode("ace/mode/javascript");
		return editor;
	}


	app.controller('EditorCtrl',
	['$scope','$http'
	,function  (scope,http) {


		var editor=aceConfig(ace);
		var editorNode={};

		scope.title="这是我的Scope";
		scope.itemClick=function  (node) {
			editorNode=node;
			if(node.isFile){
				http.post("/editor/readFile",{path:node.path})
				.then(function  (data) {
					var content=typeof(data.data)=="string"?data.data:angular.toJson(data.data,true)
					editor.setValue(content);//String
				});
			}
		}

		scope.saveFile=function  () {
			var obj={
					path:editorNode.path,
					content:editor.getValue()
				}
			console.log(obj)
			http.post("/editor/saveFile"
				,obj)
			.then(function  (data) {
				alert(data.data);
			});
		}

	}]);
});