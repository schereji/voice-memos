var express = require('express');
var router = express.Router();
var Memo = require('../../models/Memo');

router.get('/', (req, res) => {
	res.render('index')
});

router.route('/add')
	.post(function(req,res) {
		var memo = new Memo();
		memo.description = req.body.description;
		memo.audioUrl = req.body.audioUrl;
		memo.date = req.body.date;
		memo.save(function(err) {
			if (err) {res.send(err);}
			res.send(req.body);
		});
	});


router.get('/getAll',function(req, res) {
	Memo.find({}, function(err, memos) {
		if(err) {res.send(err);}
		res.send(memos);
	});
});

module.exports = router;

