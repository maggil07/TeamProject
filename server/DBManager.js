'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'CSMadnessDB';

module.exports.connectDatabase = function (){
	const client = new MongoClient(url,{useNewUrlParser: true} );
	client.connect(function(err){
		assert.equal(null, err);
		console.log("Connected Successfully to Database");
		const db = client.db(dbName);
		client.close();
	});
}

module.exports.insertUser = function(account){
const client = new MongoClient(url,{useNewUrlParser: true} );
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to Database");

  const db = client.db(dbName);
  console.log(account);
  // Insert a single document
  db.collection('users').insertOne({username: account.username, salt: account.salt, hash: account.hash}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    console.log("Inserted user to database ");

  });
});
}

module.exports.insertToken = function(username, token){
  const client = new MongoClient(url,{useNewUrlParser: true} );
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to Database");
    const db = client.db(dbName);
    var myquery = { username: username};
    var newvalues = { $set: { token: token} };
    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  });

}

module.exports.removeToken = function(username){
  const client = new MongoClient(url,{useNewUrlParser: true} );
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to Database");
    const db = client.db(dbName);
    let emptyToken  = "";
    var myquery = { username: username};
    var newvalues = { $set: { token: emptyToken }};
    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  });
}


module.exports.findUsers = function(callback){
const client = new MongoClient(url,{useNewUrlParser: true} );
 client.connect(function(err, client) {
   assert.equal(null, err);
   console.log("Connected correctly to Database");
    
   const db = client.db(dbName);
        
    db.collection("users").find({}).toArray(function(err, result) {
      if (err) throw err;
 
     client.close();
     return callback(result);
                                            
                                        
    });
  });
}

module.exports.findUser = function(user, callback){
  const client = new MongoClient(url,{useNewUrlParser: true} );
 client.connect(function(err, client) {
   assert.equal(null, err);
   console.log("Connected correctly to Database");
    
   const db = client.db(dbName);
        
   let query = { username: user };
   db.collection("users").findOne(query, function(err, result) {
     if (err) throw err;
     client.close();
     return callback(result);
   });
  });
}

module.exports.createCampaign = function(user, campaign){
	
	const client = new MongoClient(url, {useNewUrlParser: true});
	client.connect(function(err, client){
		assert.equal(null, err);
		console.log("Connect to DB");
		const db = client.db(dbName);
	    var myquery = { username: user};
	    var newvalues = { $set: { campaigns: campaign} };
	    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
	      if (err) throw err;
	      console.log("1 document updated");
	      client.close();
		  
	    });	
	});	
}

module.exports.findSystemCourseLevel = function(courseName, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
    	assert.equal(null, err);
     	console.log("Connected correctly to Database");
    
    	const db = client.db(dbName);
    	let query = { Levelname: courseName };
    	db.collection("courses").findOne(query, function(err, result) {
      	 if (err) throw err;
      	client.close();
      	return callback(result);
    	});
	});
}

module.exports.insertSystemCourseLevel = function(courseLevel){
	console.log(courseLevel);
	const client = new MongoClient(url,{useNewUrlParser: true} );
	client.connect(function(err, client) {
	  assert.equal(null, err);
	  console.log("Connected correctly to Database");

	  const db = client.db(dbName);
	  // Insert a single document
	  
	  
  	let query = { Levelname: courseLevel.Levelname };
  	db.collection("courses").findOne(query, function(err, result) {
    	 if (err) throw err;
    	//client.close();
    	if(result==null){
	  	  db.collection('courses').insertOne({Levelname : courseLevel.Levelname, Width : courseLevel.W, Height : courseLevel.H, Level:courseLevel.Level}, function(err, r) {
	  	    assert.equal(null, err);
	  	    assert.equal(1, r.insertedCount);
	  	    console.log("Inserted system course level to database ");
	  	  });
    	}
		else{
			var newvalues = { $set: { Levelname : courseLevel.Levelname, Width : courseLevel.W, Height : courseLevel.H, Level:courseLevel.Level} };
		    db.collection("courses").updateOne(query, newvalues, function(err, res) {
		      if (err) throw err;
		      console.log("1 document updated");
		      client.close();
		    });
		}
  	});
	  
	  
	  

	});
}

module.exports.findAllSystemCourseLevels = function(callback){
const client = new MongoClient(url,{useNewUrlParser: true} );
 client.connect(function(err, client) {
   assert.equal(null, err);
   console.log("Connected correctly to Database");
    
   const db = client.db(dbName);
        
    db.collection("courses").find({}).toArray(function(err, result) {
      if (err) throw err;
 
     client.close();
     return callback(result);
                                            
                                        
    });
  });
}

module.exports.findUserCampaigns = function(user, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
     assert.equal(null, err);
     console.log("Connected correctly to Database");
    
     const db = client.db(dbName);
        
     let query = { username: user };
     db.collection("users").findOne(query, function(err, result) {
       if (err) throw err;
       client.close();
       return callback(result.campaigns);
     });
    });
}

module.exports.findUserCampaignsWithToken = function(token, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
     assert.equal(null, err);
     console.log("Getting Campaigns with token");
    
     const db = client.db(dbName);
        
     let query = { token: token };
     db.collection("users").findOne(query, function(err, result) {
       if (err) throw err;
       client.close();
       return callback(result.campaigns);
     });
    });
}


module.exports.updateCampaigns = function(username, campaigns){
  const client = new MongoClient(url,{useNewUrlParser: true} );
  client.connect(function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to Database");
    const db = client.db(dbName);
    var myquery = { username: username};
    var newvalues = { $set: { campaigns: campaigns} };
    db.collection("users").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      client.close();
    });
  });

}

module.exports.findUserCampaign = function(user, campaignNumber, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
     assert.equal(null, err);
     console.log("Connected correctly to Database");
    
     const db = client.db(dbName);
        
     let query = { username: user };
     db.collection("users").find(query, { projection: { campaigns : 1} }).toArray(function(err, result) {
       if (err) throw err;
       client.close();
       //return callback(result.campaigns[campaignNumber]);
	   return callback(result[0].campaigns[campaignNumber - 1]);
     });
    });
}


module.exports.findUserCampaignWithToken = function(token, campaignNumber, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
     assert.equal(null, err);
     console.log("Connected correctly to Database");
    
     const db = client.db(dbName);
        
     let query = { token: token };
     db.collection("users").find(query, { projection: { campaigns : 1} }).toArray(function(err, result) {
       if (err) throw err;
       client.close();
       //return callback(result.campaigns[campaignNumber]);
	   return callback(result[0].campaigns[campaignNumber - 1]);
     });
    });
}








