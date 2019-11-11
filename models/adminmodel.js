var db = require('./db')

module.exports = {
	

	getById: function(id, callback){
           
			var sql = "select * from admin where id=?";
			db.getResults(sql, [id], function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},
	getByIdcustomer: function(user, callback){
           
		var sql = "select * from customer where id=?";
		db.getResults(sql, [user.id], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
},
	getAllusername: function(user, callback){

		var sql = "select * from admin where username=?";
		db.getResults(sql, [user.username], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
},
getAllmedicine: function(callback){

	var sql = "select * from medicines ";
	db.getResults(sql,[], function(results){
		if(results.length > 0 ){
			callback(results);
		}else{
			callback([]);
		}
	});
},
updateAdmin: function(user, callback){
	var sql ="update admin set name=?,address=?,email=?,contact=?,username=?, password=? where id=?";
	var sql1 ="update login set username=?, password=? where username=?";


	db.execute(sql, [user.name,user.address,user.email,user.contact,user.username, user.password, user.id], function(status){
		
		if(status)
		{
			db.execute(sql1, [user.username, user.password, user.cookiename], function(status){
			callback(status);
		});
	}
});
},
	validate: function(user, callback){
		var sql ="select * from login where username=? and password=?";

		db.getResults(sql, [user.username, user.password], function(result){

			if(result.length > 0){
				console.log(result[0]);
				callback(result[0].status);
			}
			else{
				callback(-1);
			}
		});	
	},
	getAll: function(callback){
		var sql = "select * from customer";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	insertLogin: function(user, callback){

		var sql ="insert into admin values('',?,?,?,?,?,?)";
		var sql1="insert into login values('', ?, ?,?)";
		console.log(user);
		db.execute(sql, [user.Name,user.address,user.email,user.contract,user.username,user.password], function(status){
	console.log('database',status);
		if(status)
		{
			db.execute(sql1, [user.username, user.password,0], function(status){
				callback(status);
			});
		}
		
	});
	},

	update: function(user, callback){
		var sql ="update user set username=?, password=? where id=?";
	
		db.execute(sql, [user.username, user.password, user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		console.log(id);
		var sql = "delete  from customer where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
	InsertMedicine: function(user, callback){
		
		var sql ="insert into medicines values('',?,?,?,?,?,?)";
		db.execute(sql, [user.name,user.vendor,user.type,user.category,user.price,user.amount], function(status){
			callback(status);
		});
	},
	getIdMedicine: function(user, callback){
           
		var sql = "select * from medicines where id=?";
		db.getResults(sql, [user.id], function(result){
			if(result.length > 0 ){
				callback(result);
			}else{
				callback([]);
			}
		});
},
getIdMedicineUpdate: function(id, callback){
           
	var sql = "select * from medicines where id=?";
	db.getResults(sql, [id], function(result){
		if(result.length > 0 ){
			callback(result[0]);
		}else{
			callback([]);
		}
	});
},
updateMedicine: function(user, callback){
	var sql ="update  medicines set name=?, vendor=?,price=?,amount=? where id=?";

	db.execute(sql, [user.name, user.vendor,user.price,user.amount, user.id], function(status){
		callback(status);
	});
},
	deleteMedicine: function(id, callback){
		console.log(id);
		var sql = "delete  from medicines where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
	
}



