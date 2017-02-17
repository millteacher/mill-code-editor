var fs=require("fs");
var obj={};
function walk (path,file,noeach) {
	if(file==null){
		file={};
		file.name="root";
		file.path=path;
		file.child=[];
		file.isFile=false;
	}
	var files=fs.readdirSync(path);
	files.forEach(function  (item,index,arr) {
		var tmpPath=path+"/"+item;
		var tmpfile={
			name:item,
			path:tmpPath,
			child:[]
		}

		if(file.child)file.child.push(tmpfile);

		var stats= fs.statSync(tmpPath);
		tmpfile.isFile=stats.isFile();
		for(var i in noeach){
			if(item==noeach[i]){
				stats=null;
			}
		}
		if(stats&&stats.isDirectory()){
			walk(tmpPath,tmpfile,noeach);
		}else{

		}
	});
	return file;
}
function eachFile (root,noeach) {
	troot=root;
	var result=walk(troot,null,noeach);
	return result;
}
obj.walk=eachFile;
module.exports=obj;