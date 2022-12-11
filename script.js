const spaceGame = (() =>{

    let speed = 5;
    let bulletSpeed = 10;
    let score = 0;
    const mainGame = document.querySelector('.mainGame');
    const divPos = mainGame.getBoundingClientRect();
    let isGameStart = false;
    const controlKeys = {
        'ArrowRight':false,
        'ArrowLeft':false,
        'ArrowUp':false,
        'ArrowDown':false,
        ' ': false,
    }
    const explodeSound = new Audio();
    explodeSound.src = './assets/explodeSound.wav';
    explodeSound.preload = 'auto';
    const gunSound = new Audio();
    gunSound.src = './assets/gun.wav'
    gunSound.preload = 'auto';
    const theme = document.getElementById('theme');
    const scoreCon = document.getElementById('score');

    const spawn = () =>{
        if(!isGameStart) return;
        const ship = document.createElement('div');
        ship.classList.add('spaceShip');
        mainGame.append(ship);
        ship.style.left = divPos.left + (divPos.right - divPos.left)/2 + 'px'
        ship.style.top = divPos.top + (divPos.bottom - divPos.top)/1.2 + 'px'
    }

    const spawnEnemies = () =>{
        if(!isGameStart) return;
        const enemies = document.querySelectorAll('.enemy');
        if(enemies.length != 0) return;
        for(let i=0; i<7; i++){
            const enemy = document.createElement('div');
            enemy.style.position = 'absolute';
            let rand = Math.floor(Math.random()*2);
            enemy.classList.add('enemy');
            if(rand == 1){
                enemy.classList.add('enemy2');
            }
            enemy.style.top = divPos.top + 'px';
            enemy.style.left = Math.floor(Math.random()*(divPos.right-divPos.left)*0.9)+ divPos.left + 30 + 'px';
            mainGame.append(enemy);
        }
    }

    const enemyMovement = () =>{
        if(!isGameStart) return;
        const enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            let pos = enemy.getBoundingClientRect();
            if(pos.top > divPos.bottom - 40){
                enemy.remove();
            }
            enemy.style.top = pos.top + 1 + 'px';
        });
    }

    const movement = () =>{
        if(!isGameStart) return;
        const ship = document.querySelector('.spaceShip')
        let shipPos = ship.getBoundingClientRect();
        let left = shipPos.left;
        let top = shipPos.top;
        if(controlKeys.ArrowRight){
            if(left > divPos.right-40) return;
            left += speed;
            ship.classList.add('right');
            ship.style.left = left + 'px';
        }if(controlKeys.ArrowLeft){
            if(left < divPos.left+8) return;
            left -= speed;
            ship.classList.add('left');
            ship.style.left = left + 'px';
        }if(controlKeys.ArrowDown){
            if(top > divPos.bottom - 50) return;
            top += speed;
            ship.style.top = top + 'px';
        }if(controlKeys.ArrowUp){
            if(top < divPos.top+20) return;
            top -= speed;
            ship.style.top = top + 'px';
        }if(controlKeys[" "]){
            shoot();
            controlKeys[" "] = false;
        }
    }

    const bulletMovement = () =>{
        if(!isGameStart) return;

        scoreCon.innerHTML = score;
        const bullets = document.querySelectorAll('.bullet');

        bullets.forEach(bullet => {
            let bulletPos = bullet.getBoundingClientRect();
            bullet.style.top = bulletPos.top - bulletSpeed + 'px';
            checkBulletHit();
            if(parseInt(bullet.style.top) < divPos.top){
                bullet.remove();
            }
            
        });
    }

    const checkBulletHit = () =>{
        if(!isGameStart) return;

        const bullets = document.querySelectorAll('.bullet');
        const enemies = document.querySelectorAll('.enemy');

        bullets.forEach(bullet => {
            let bulletPos = bullet.getBoundingClientRect();
            
            enemies.forEach(enemy => {
                let enemyPos = enemy.getBoundingClientRect();
                if(Math.abs(bulletPos.left - enemyPos.left) < 30 && Math.abs(bulletPos.top - enemyPos.top) < 20){
                    score += 10;
                    explodeSound.play();
                    explode(enemyPos.left, enemyPos.top);
                    enemy.remove();
                    bullet.remove();
                }
            });

        });
    }

    const explode = (x, y) =>{
        if(!isGameStart) return;

        const explosion = document.createElement('div');
        explosion.classList.add('explode');
        explosion.style.position = 'absolute'
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
        mainGame.appendChild(explosion);
        setTimeout(explodeRemove, 500);
    }

    const explodeRemove = () =>{
        const explode = document.querySelector('.explode')
        explode.remove();
    }

    const controls = () =>{
        if(!isGameStart) return;

        document.addEventListener('keydown', (e)=>{
            if(e.key == "ArrowRight"){
                controlKeys["ArrowRight"] = true;
            }if(e.key == "ArrowLeft"){
                controlKeys["ArrowLeft"] = true;
            }if(e.key == "ArrowDown"){
                controlKeys["ArrowDown"] = true;
            }if(e.key == "ArrowUp"){
                controlKeys["ArrowUp"] = true;
            }if (e.key == " "){
                controlKeys[" "] = true;
                const gun = gunSound.cloneNode();
                gun.play();
                gun.remove();
            }
        })
        document.addEventListener('keyup', (e)=>{
            const ship = document.querySelector('.spaceShip')
            if(e.key == "ArrowRight"){
                controlKeys["ArrowRight"] = false;
                ship.classList.remove('right');
            }if(e.key == "ArrowLeft"){
                controlKeys["ArrowLeft"] = false;
                ship.classList.remove('left');
            }if(e.key == "ArrowDown"){
                controlKeys["ArrowDown"] = false;
            }if(e.key == "ArrowUp"){
                controlKeys["ArrowUp"] = false;
            }if(e.key == " "){
                controlKeys[" "] = false;
            }
        })
    }

    const shoot = () =>{
        if(!isGameStart) return;

        const ship = document.querySelector('.spaceShip').getBoundingClientRect();
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = ship.left + 16 + 'px';
        bullet.style.top = ship.top + 'px';
        mainGame.append(bullet);
    }

    const changeBG = () => {
        if(!isGameStart) return;
        if(mainGame.classList.contains('round1')){
            mainGame.classList.add('round2');
            mainGame.classList.remove('round1')
        }
        else if(mainGame.classList.contains('round2')){
            mainGame.classList.add('round3');
            mainGame.classList.remove('round2')
        }
        else if(mainGame.classList.contains('round3')){
            mainGame.classList.add('round4');
            mainGame.classList.remove('round3')

        }
        else if(mainGame.classList.contains('round4')){
            mainGame.classList.add('round5');
            mainGame.classList.remove('round4')

        }
    }

    const startGame = () =>{
        const menu = document.querySelector('.menu')
        const startButton = document.getElementById('start');
        const header = document.querySelector('.header');
        const scoreDiv = document.querySelector('.score');


        startButton.addEventListener('click', ()=>{
            menu.style.display = 'none';
            header.classList.add('show');
            scoreDiv.classList.add('show'); 
            isGameStart = true;
            spaceGame.spawn();
            spaceGame.controls();
            theme.play();
        })
    }

    return {spawn, controls, movement, bulletMovement,spawnEnemies, enemyMovement, changeBG, startGame}

})();

spaceGame.startGame();

setInterval(spaceGame.movement, 16);
setInterval(spaceGame.bulletMovement, 16);
setInterval(spaceGame.enemyMovement, 16);
setInterval(spaceGame.changeBG, 10000);
spaceGame.spawnEnemies();
setInterval(spaceGame.spawnEnemies, 2000);

