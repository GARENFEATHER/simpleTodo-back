var express=require('express');
var router=express.Router();
var Task=require('../models/task');
router.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

router.post("/",function(req, res, next) {
	var task=req.body;
	Task.create(task, function(err, task){
		if(err) {
			return res.status(400).send("err post /task");
		} else {
			return res.status(200).json(task);
		}
	});
});

router.get("/", function(req, res, next){
	Task.find({}, function(err, tasks){
		if(err) {
			console.log(err);
			return res.status(400).send("err get /task");
		} else {
			console.log(tasks);
			return res.status(200).json(tasks);
		}
	});
});
module.exports=router