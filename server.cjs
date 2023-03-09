var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
const app = express();
const server = app.listen(8000);
const io = require('socket.io')(server);

const sessionMiddleware = session({
	secret: 'keyboardkitteh',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
});

app.use(sessionMiddleware);
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views'); 
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
io.engine.use(sessionMiddleware);

app.get("/", function (req, response){
	response.render('index.ejs');
});