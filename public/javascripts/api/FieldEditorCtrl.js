define(['app', 'aceConf'], function(app, aceConf) {

	function insert(http, scope) {
		http.post("/api/doSql", {
			data: [scope.validateName, scope.validateType],
			table: "mill_validate",
			key: "insertName"
		}).then(function(data) {
			alert(data.data);
		});

	}
	var fieldType = {
		"int": 1,
		"text": 2,
		"varchar": 2,
		"datetime": 4,
		"longtext": 2,
		"smallint": 2,
		"bigint": 2,
		"decimal": 3,
		"date": 4,
		"mediumtext": 2,
		"time": 4,
		"float": 3
	}

	function getValidate(http, rootparams, scope) {
		http.get("/api/get_row/mill_field/" + rootparams.field_id)
			.then(function(data) {
				scope.fieldInfo = data.data;

				scope.validateType = fieldType[data.data.data_type];
			});
	}

	function getAllValidate(http, scope) {
		http.get("/api/get_all/mill_validate?arg[]=" + scope.validateType)
			.then(function(data) {
				scope.validateInfos = data.data;
			});
	}
	//保存配置到字段中间表field_id,validate_id,validate_param
	function saveConfig (id,validate,value,http) {

		http.post("/api/insert",{
			table:"mill_field_validate",
			data:[
				id,validate.validate_id,value
			]
		})
		.then(function  (data) {
			alert(data.data);
		});
	}
	function saveValidateConfig(currentValidate,value,http){

		http.post("/api/doSql",{
			table:"mill_validate",
			key:"updateParam",
			data:[
				value,currentValidate.validate_id
			]
		})
		.then(function  (data) {
			currentValidate.validate_param=value;
			alert(data.data);
		});
	}
	function saveValidate(currentValidate,value,http){
		http.post("/api/doSql",{
			table:"mill_validate",
			key:"updateCode",
			data:[
				value,currentValidate.validate_id
			]
		})
		.then(function  (data) {
			currentValidate.validate_code=value;
			alert(data.data);
		});
	}
	function fillField (http,scope,rootparams) {
		http.get("/api/get_all/mill_field_validate?key=getJoinByField&arg[]="+rootparams.field_id)
		.then(function  (data) {

			scope.fieldValidateList=data.data;
		});
	}
	var typeArr=[
		"字段配置","验证配置","验证模板"
	];
	app.controller('FieldEditorCtrl', ['$scope', '$http', '$routeParams',
		function(scope, http, rootparams) {
			var editor = aceConf.aceInit('editor', 'json');
			//验证的类型字符串、整数
			scope.validateType = 2;
			//验证的名称
			scope.validateName = "aa";
			
			var editorType = 1; //编辑类型：字段配置、验证配置、验证模板
			scope.currentEditTitle=typeArr[editorType-1];
			var currentValidate={};//当前被编辑的validate
			var currentFieldValidate={};//当前被编辑的field_validate
			//获取字段信息
			getValidate(http, rootparams, scope);
			//获取验证信息
			getAllValidate(http, scope);
			//添加字段验证
			fillField (http,scope,rootparams);
			//添加验证规则
			scope.addValidateName = function() {
					if (scope.validateName != "aa"){
						insert(http, scope);
					}
						
				}
				//设置当前编辑项
			scope.setItem = function(item) {
					var param=item.validate_param?item.validate_param:" ";
					currentFieldValidate.validate_param=item.validate_param;
					editor.setValue(param);
					currentValidate=item;
					editor.getSession().setMode("ace/mode/json");
					editorType = 1;
				}
				//保存
			scope.save = function() {
				alert(editorType);
				switch (editorType) {
					case 1:
						saveConfig(rootparams.field_id,currentValidate,editor.getValue(),http);//保存字段配置
						break;
					case 2:
						saveValidateConfig(currentValidate,editor.getValue(),http);//保存验证配置
						break;
					case 3:
						saveValidate(currentValidate,editor.getValue(),http);//保存模板设置
						break;
					default:
						alert("没有编辑项");
				}
			}
			scope.setCurrentFieldValidate=function  (fieldValidate) {

				editor.setValue(fieldValidate.validate_param);
				currentValidate.validate_id=fieldValidate.validate_id;
				editorType=1;
				currentFieldValidate=fieldValidate;
			}
			//编辑模板配置
			scope.editTemplateConfig=function  () {

				if(!currentValidate.validate_param){
					return alert("没有当前编辑项");
				}else{
					editor.setValue(currentValidate.validate_param);
					editor.getSession().setMode("ace/mode/json");
					editorType = 2;
				}

			}
			//编辑配置
			scope.editConfig=function  () {
				if(!currentValidate.validate_param){
					return alert("没有当前编辑项");
				}else{
					editor.setValue(currentFieldValidate.validate_param);
					editor.getSession().setMode("ace/mode/json");
					editorType = 1;
				}
			}
			//编辑模板
			scope.editTemplate=function  () {
				if(!currentValidate.validate_param){
					return alert("没有当前编辑项");
				}
				editor.getSession().setMode("ace/mode/javascript");
				editor.setValue(currentValidate.validate_code);
				editorType = 3;
			}
		}
	]);
});