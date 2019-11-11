var db = require('./db')

module.exports = {

	getById: function(id, callback){

			var sql = "select * from customer where id=?";
			db.getResults(sql, [id], function(result){
				if(result.length > 0 ){
					callback(result[0]);
				}else{
					callback([]);
				}
			});
	},
	getByIdorder: function(id, callback){

		var sql = "select * from ordercustomer where id=?";
		db.getResults(sql, [id], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
},
getByIdorder2: function(id, callback){

	var sql = "select * from ordercustomer where id=?";
	db.getResults(sql, [id], function(result){
		if(result.length > 0 ){
			callback(result);
		}else{
			callback([]);
		}
	});
},
	updateCustomer: function(user, callback){
		var sql ="update customer set name=?,address=?,email=?,contact=?,username=?, password=? where id=?";
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
	insertLogin: function(user, callback){

		var sql ="insert into customer values('',?,?,?,?,?,?)";
		var sql1="insert into login values('', ?, ?,?)";
		console.log(user);
		db.execute(sql, [user.Name,user.address,user.email,user.contract,user.username,user.password], function(status){
	console.log('database',status);
		if(status)
		{
			db.execute(sql1, [user.username, user.password,1], function(status){
				callback(status);
			});
		}
		
	});
	},
	getCustomer: function(user,callback){
		var sql = "select * from customer where username=?";
		
		db.getResults(sql, [user.username], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAllmedicines: function(callback){
		var sql = "select * from medicines";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	insertOrdercustomer: function(user, callback){

		var sql ="insert into ordercustomer values('', ?, ?,?,?,?)";
		db.execute(sql, [user.name, user.category,user.amount,user.date,user.username], function(status){
			callback(status);
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		
		db.getResults(sql, [], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},
	getAllusername: function(user,callback){
		var sql = "select * from ordercustomer where username=?";
		
		db.getResults(sql, [user.username], function(results){
			
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});	
	},

	insert: function(user, callback){

		var sql ="insert into user values('', ?, ?)";
		db.execute(sql, [user.username, user.password], function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql ="update user set username=?, password=? where id=?";
	
		db.execute(sql, [user.username, user.password, user.id], function(status){
			callback(status);
		});
	},
	updateorder: function(user, callback){
		var sql ="update ordercustomer set category=?, amount=?,date=? where id=?";
	
		db.execute(sql, [user.category, user.amount, user.date,user.id], function(status){
			callback(status);
		});
	},
	delete: function(id, callback){
		console.log(id);
		var sql = "delete  from ordercustomer where id=?";
		db.execute(sql, [id], function(status){
			callback(status);
		});
	}
}



