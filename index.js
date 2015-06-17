var http    = require('http');
var mongodb = require('mongodb');
var mongocl = mongodb.MongoClient;
var url     = "http://matchcentre.starsports.com/kabaddi/1/60";

var mongo_url  = "mongodb://localhost/sportscafe";
var re      = new RegExp('_si_calendarobj = (.*?);');
var obj;
http.get(url,function(res){
	var data="";
	res.on("data",function(chunk){
		data+=chunk;
	});
	res.on("end",function(){
		a=data.match(re);
		obj=JSON.parse(a[1]);
		b();
	});
});

function b(){
mongocl.connect(mongo_url,function(err,db){
	console.log(obj);
	var collection = db.collection("games");
	collection.insert(obj,function(err,result){
		if(err) {
			console.log(err);
		}
		else{
			console.log("db populated");
			db.close();
		}
	});

});
}
