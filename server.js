var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
const { info } = require("console");
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


let players = [];
io.on('connection', function (socket) {
	
	socket.on('new_connection', function(){
		if(players.length >= 2) return;
		let newStudent = `Socket ID ${socket.id} is now connected!`;
		let player = {
			id: socket.id,
			initialPos: (Math.random()*2) + 1
		}
		players.push(player);
		socket.emit('new_player', players);
		socket.broadcast.emit('add_player', player);
	})

	socket.on('send_position', function(data){
		for(let player of players){
			if(player.id == data.id){
				player['pos'] = data.pos;
			}
		}
	})

	socket.on('send_new_pos', function(data){
		for(let player of players){
			if(player.id == data.id){
				player['pos'] = data['pos'];
			}
		}
		io.emit('update_pos', players)
	});

	socket.on('start_game', function(){
		io.emit('start_to_all');
	})

	socket.on('disconnect', function(){
		for (let i = 0; i < players.length; i++) {
			if (players[i].id === socket.id) {
				socket.broadcast.emit('remove_player', players[i].id);
				players.splice(i, 1);
				break;
			}
		  }
	})

	socket.on('send_enemy_state', function(enemies){
		socket.broadcast.emit('enemy_states', enemies);
	})

	socket.on('shoot', function(bulletPos){
		socket.broadcast.emit('other_player_bullets', bulletPos);
	})
      
});