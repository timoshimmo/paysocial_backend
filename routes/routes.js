// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {

	//register a user
	app.post('/register', (request, response) => {
		pool.query('INSERT INTO `users` (firstName, lastName, email, mobile, username, password, userid) VALUES (?, ?, ?, ?, ?, ?, ?)', 
			[request.body.firstName, request.body.lastName, request.body.emailAddress, request.body.mobileNo, request.body.username,
			request.body.password, request.body.userid], (error, result) => {
			if (error) {
				response.send('{"status": 0, "msg": "Error creating user"}');
				throw error;
			} 
			else {
				response.status(200).send('{"status": 1, "msg": "Saved Sucessfully!"}');
			}
            
		});
	}); 

	//validate user
	app.get('/validate', (request, response) => {
		pool.query('SELECT userid FROM `users` WHERE username = ? AND password = ?', 
			uname, function(error, result) {
			if (error) {
				console.log('Error:', error);
			} 
			else if (result.length) {
         		console.log('Found:', result);
         		response.send('{"status": 1, "msg": "Logged in successful", "uid":'+JSON.stringify(result)+"}");
			}
			else {
				console.log('Found:', result);
				response.send('{"status": 2, "msg": "No results found"}');
			}
            
		});
	}); 

	//make transaction
	app.post('/add-transctions', (request, response) => {
		pool.query('INSERT INTO `transactions` (transactionCode, fullname, emailAddress, mobileNo, serviceType, serviceProvider,' 
			+ 'serviceIdNo, cost, bankName, commChannel, userid, username, created, transactionStatus)'
			+ ' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
			[request.query.transcode, request.query.fullname, request.query.emailAddress, request.query.mobileNo, 
			request.query.serviceType, request.query.serviceProvider, request.query.serviceIdNo,
			request.query.cost, request.query.bankName, request.query.commChannel, request.query.userid, 
			request.query.username, request.query.createdAt, request.query.tStatus], (error, result) => {
			if (error) {
				response.send('{"status": 0, "msg": "Error creating transaction"}');
				throw error;
			} 
			else {
				response.status(200).send('{"status": 1, "msg": "Transaction completed!"}');
			}
            
		});
	}); 

	//get transaction details 
	app.get('/transaction-details', (request, response) => {
		pool.query('SELECT transactionCode, serviceProvider, serviceIdNo, bankName, created,' 
			+ ' transactionStatus FROM `transactions` WHERE id = ?', 
			[request.query.transacId], function(error, result) {
			if (error) {
				console.log('Error:', error);
			} 
			else if (result.length) {
         		console.log('Found:', result);
         		response.send('{"status": 1, "transaction":'+JSON.stringify(result)+"}");
			}
			else {
				console.log('Found:', result);
				response.send('{"status": 2, "msg": "No results found"}');
			}
            
		});
	}); 

	//get transaction details 
	app.get('/track-transactions', (request, response) => {
		pool.query('SELECT transactionCode, serviceType, serviceProvider, cost, created, transactionStatus' 
			+ ' FROM `transactions` WHERE transactionStatus < 2', function(error, result) {
			if (error) {
				console.log('Error:', error);
			} 
			else if (result.length) {
         		console.log('Found:', result);
         		response.send('{"status": 1, "transactions":'+JSON.stringify(result)+"}");
			}
			else {
				console.log('Found:', result);
				response.send('{"status": 2, "msg": "No results found"}');
			}
            
		});
	}); 

}

// Export the router
module.exports = router;