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

module.exports.insertLevel = function(level){
const client = new MongoClient(url,{useNewUrlParser: true} );
client.connect(function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to Database");
	console.log("insert level");
  const db = client.db(dbName);

  // Insert a single document
  db.collection('Level').insertOne({Username : level.Username , Levelname : level.Levelname , Diffuculty : level.Difficulty, Width : level.W, Height : level.H, Level:level.Level }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);
    console.log("Inserted user to database ");

  });
});
}


module.exports.findLevel = function(username,levelName, callback){
    const client = new MongoClient(url,{useNewUrlParser: true} );
   	client.connect(function(err, client) {
    	assert.equal(null, err);
     	console.log("Connected correctly to Database");
    	console.log("find level Hit");
    	const db = client.db(dbName);
    	let query = { Username : username };
    	db.collection("Level").findOne(query, function(err, result) {
      	 if (err) throw err;
      	client.close();
	//console.log("result" + result["Levelname"] );
      	return callback(result);
    	});
	});
}

module.exports.findAllLevels = function(callback){
const client = new MongoClient(url,{useNewUrlParser: true} );
 client.connect(function(err, client) {
   assert.equal(null, err);
   console.log("Connected correctly to Database");
    
   const db = client.db(dbName);
        
    db.collection("Level").find({}).toArray(function(err, result) {
      if (err) throw err;
 

     console.log("Name " + result);	
     client.close();
     return callback(result);
                                            
                                        
    });
  });
}


module.exports.findUserLevels = function(username, callback){
const client = new MongoClient(url,{useNewUrlParser: true} );
 client.connect(function(err, client) {
   assert.equal(null, err);
   console.log("Connected correctly to Database");

   const db = client.db(dbName);
	let query = { Username : username };	
    db.collection("Level").find(query).toArray(function(err, result) {
      if (err) throw err;


     console.log("Name " + result);
     client.close();
     return callback(result);


    });
  });
}


