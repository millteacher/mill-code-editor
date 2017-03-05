module.exports={
	business:{
		mill_model:{
			insert:"insert into mill_model (model_name,model_comment) values (?,?)",
			update:"update mill_model set model_name=?,model_comment=? where model_id=?",
			getRow:"select * from mill_model where model_id=?",
			getAll:"select * from mill_model",
			deleteRow:"delete from mill_model where model_id=?",
		}
	}
}