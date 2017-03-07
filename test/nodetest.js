var exec = require('child_process').exec; 
exec("dir",function (err,stdout,stderr) {
	if(err){
		console.error(stderr);
	}else{
		console.log(typeof(stdout));
	}
})