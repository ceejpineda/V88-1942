var socket = io();
            
//socket.emit('new_connection');

const gameScreen = new GameScreen();
const gameSound = new GameSound();
const environment = new Environment();
const startButton = document.getElementById('start');

socket.emit('new_connection');

let mySpaceshipId;
let myShip;
let otherShip;

socket.on('new_player', function(players){
    for(let i=0; i<players.length; i++){
        if (players[i].id === socket.id) {
            mySpaceshipId = players[i].id;
            myShip = new SpaceShip(mySpaceshipId);
            let newShip = myShip.spawn();
            gameScreen.appendElements(newShip);                                                                                                                                                                                                                                                                                                                                                 
            myShip.controls();
            setInterval(myShip.shipMovement, 1000/60);
            setInterval(function() {
                socket.emit('send_new_pos', {id: socket.id, pos: {left: myShip.left, top: myShip.top}});
            }, 1000/60);
        }else{
            otherShip = new SpaceShip(players[i].id);
            let newShip = otherShip.spawn();
            gameScreen.appendElements(newShip);
        }

        let playerShip = document.getElementById(players[i].id);
        playerShip.style.left = gameScreen.divPos.left + (gameScreen.divPos.right - gameScreen.divPos.left)/players[i].initialPos + 'px';
        playerShip.style.top = gameScreen.divPos.top + (gameScreen.divPos.right - gameScreen.divPos.left)/(1.2) + 'px';    
        
        if (i === 1 && document.querySelectorAll('spaceShip2').length == 0) {
            playerShip.classList.add('spaceShip2');
        }

        socket.emit('send_position', {id: players[i].id, pos: {left: playerShip.style.left, top: playerShip.style.top}});
    }
});

socket.on('add_player', function(player){
    let newplayer = new SpaceShip(player.id);
    let newShip = newplayer.spawn();
    if(document.querySelectorAll('spaceShip2').length == 0){
        newShip.classList.add('spaceShip2')
    }
    gameScreen.appendElements(newShip);
    
    let playerShip = document.getElementById(player.id);
    playerShip.style.left = gameScreen.divPos.left + (gameScreen.divPos.right - gameScreen.divPos.left)/player.initialPos + 'px';
    playerShip.style.top = gameScreen.divPos.top + (gameScreen.divPos.right - gameScreen.divPos.left)/(1.2) + 'px';    
    socket.emit('send_position', {id: player.id, pos: {left: playerShip.style.left, top: playerShip.style.top}});
});

socket.on('update_pos', function(players){
    for(let player of players){
        if (player.id === socket.id) {
            let playerShip = document.getElementById(player.id);
            playerShip.style.left = player.pos.left + 'px';
            playerShip.style.top = player.pos.top + 'px';
        }else{
            let otherShip = document.getElementById(player.id);
            otherShip.style.left = player.pos.left + 'px';
            otherShip.style.top = player.pos.top + 'px';
        }
    }
});

socket.on('remove_player', function(player){
    let playerShip = document.getElementById(player);
    console.log(playerShip)
    playerShip.remove();
});

startButton.addEventListener('click', function(){
    socket.emit('start_game');
    setInterval(function(){
        let enemies = environment.spawnEnemy();
        if(enemies){
            for(let i=0; i<enemies.length; i++){
                gameScreen.append(enemies[i]);
            }
            socket.emit('send_enemy_state', environment.enemyDetails);
            environment.enemyDetails = [];
        }
    }, 2000);
});

socket.on('start_to_all', function(){
    gameScreen.startGame();
    setInterval(gameScreen.changeBG, 10000)
    gameSound.playTheme();
});

socket.on('enemy_states', function(enemies){
    if(enemies){
        for(let i=0; i<enemies.length; i++){
            const enemy = document.createElement('div');
            enemy.style.position = 'absolute';
            for(let classname of enemies[i].classes){
                enemy.classList.add(classname);
            }
            enemy.style.top = enemies[i].position.top;
            enemy.style.left = enemies[i].position.left;
            console.log(enemies[i].top)
            gameScreen.append(enemy);
        }
    }
})

socket.on('other_player_bullets', function(bulletPos){
    console.log(bulletPos);
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    gameScreen.appendElements(bullet);
    bullet.style.left = bulletPos.bulletLeft + 12 + 'px';
    bullet.style.top = bulletPos.bulletTop + 'px';
});

document.addEventListener('keypress', function(e){
    if(e.key == ' '){
        let bullet = myShip.shoot();
        gameScreen.appendElements(bullet);
        bullet.style.left = myShip.left + 12 + 'px';
        bullet.style.top = myShip.top + 'px';
        const gun = myShip.gunSound.cloneNode();
        gun.play();
        gun.remove();
        socket.emit('shoot', {bulletLeft : myShip.left, bulletTop: myShip.top})
    }
})

setInterval(environment.bulletMovement, 1000/60);
setInterval(environment.enemyMovement, 1000/60);
setInterval(environment.checkBulletHit, 1000/60);




