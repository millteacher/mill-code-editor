module.exports={
	business:{
		mill_model:{
			insert:"insert into mill_model (model_name,model_comment) values (?,?)",
			update:"update mill_model set model_name=?,model_comment=? where model_id=?",
			getRow:"select * from mill_model where model_id=?",
			getAll:"select * from mill_model",
			deleteRow:"delete from mill_model where model_id=?",
		},
		mill_table:{
			getAll:"select * from mill_table",
		},
		mill_field:{
			getAllForTable:"SELECT field_id,column_name,data_type,column_key,column_comment,(SELECT count(*) from mill_field_validate where field_id=field_id) as validate FROM mill_field where table_name=?",
		},
		mill_field_validate:{
			getByField:"SELECT * from mill_field_validate where field_id=?"
		},
		mill_validate:{
			insertName:"insert into mill_validate (validate_name,validata_type) values(?,?)",
		}
	}
}