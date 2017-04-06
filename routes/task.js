var express=require('express');
var router=express.Router();
var Task=require('../models/task');
router.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

router.post("/",function(req, res, next) {
	var task=req.body;
	if(task['create_at'] != null) {
		Task.update({create_at:task.create_at},{status:task.status},function(err, t){
			if(err) {
	                        console.log(err);
        	                return res.status(500).send("err post /task update");
                	} else {
                        	console.log(t);
	                        return res.status(200).json(task);
        	        }
		});
	} else {
	Task.create(task, function(err, task){
		if(err) {
			console.log(err);
			return res.status(400).send("err post /task create");
		} else {
			console.log(task);
			return res.status(200).json(task);
		}
	});
	}
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
