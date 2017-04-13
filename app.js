var express = require('express');
var app = express();
var router = express.Router();
var morgan = require('morgan');

app.use(morgan('dev'));
app.set('views',__dirname + '/views');
app.set('view engine','ejs');
app.use('/css', express.static(__dirname + '/assets/css'));
app.use('/js', express.static(__dirname + '/assets/js'));
app.use('/img', express.static(__dirname + '/assets/img'));

router.get('/',(req,res)=>{
	res.render('index',{title:'home',content:'This is the main content area',sidebar:'welcome to the sidebar'});
});
app.use('/',router);
// api route
router.use('/user/:name',(req,res,next)=>{
	console.log('api router called');
	console.log('query -',req.query);
	console.log('params -',req.params);
	res.locals.greetings = 'hello ' + req.params.name;
	next();
})
.get('/user/:name',(req,res)=>{
	console.log(res.locals.greetings);
	res.render('index',{
		title: 'greetings',
		content: res.locals.greetings,
		sidebar: 'sidebar'
	})
})
app.use('/api',router);
app.listen(process.env.PORT || 3000, ()=>{console.log("app started")});