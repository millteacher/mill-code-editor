let service = require("../service/CommonService.js");
service.setDb("business");

function testInsert(argument) {
	service.insert(['aaa', 'bbb'], 'mill_model');
}

function testUpdate() {
	service.update(['love', "爱人的模块", 1], 'mill_model');
}

function testGetRow() {
	service.getRow([1], 'mill_model').then(function(data) {
		console.log(data)
	});


}

function deleteRow() {
	service.deleteRow([2], 'mill_model').then(function(data) {
		console.log(data)
	});
}

function testGetAll() {
	service.getAll([], 'mill_model').then(function(data) {
		console.log(data)
	}, function(err) {
		console.log(err)
	});
}
deleteRow()