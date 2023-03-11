class SpaceGame {

    constructor(){
        this.speed = 5;
        this.bulletSpeed = 10;
        this.score = 0;
        //this.mainGame = document.querySelector('.mainGame');
        //this.divPos = this.mainGame.getBoundingClientRect();
        //this.isGameStart = false;
        /*this.controlKeys = {
            'ArrowRight':false,
            'ArrowLeft':false,
            'ArrowUp':false,
            'ArrowDown':false,
            ' ': false,
        }*/
        //this.explodeSound = new Audio();
        //this.explodeSound.src = './assets/explodeSound.wav';
        //this.explodeSound.preload = 'auto';
        //this.gunSound = new Audio();
        //this.gunSound.src = './assets/gun.wav';
        //this.gunSound.preload = 'auto';
        //this.theme = document.getElementById('theme');
        //this.scoreCon = document.getElementById('score');
        //this.ship = '';
        this.enemies = '';
        //this.menu = document.querySelector('.menu')
        //this.startButton = document.getElementById('start');
        //this.header = document.querySelector('.header');
        //this.scoreDiv = document.querySelector('.score');
        this.movement = this.movement.bind(this);
        this.bulletMovement = this.bulletMovement.bind(this);
        this.enemyMovement = this.enemyMovement.bind(this);
        this.checkBulletHit = this.checkBulletHit.bind(this);
        this.spawnEnemies = this.spawnEnemies.bind(this);
        //this.ship = document.querySelector('.spaceShip');
    }

    movement(){
        if(!this.isGameStart) return;
        let shipPos = this.ship.getBoundingClientRect();
        let left = shipPos.left;
        let top = shipPos.top;
        if(this.controlKeys["ArrowRight"]){
            left += this.speed;
            this.ship.classList.add('right');
            this.ship.style.left = left + 'px';
        }if(this.controlKeys['ArrowLeft']){
            if(left < this.divPos.left+8) return;
            left -= this.speed;
            this.ship.classList.add('left');
            this.ship.style.left = left + 'px';
        }if(this.controlKeys['ArrowDown']){
            if(top > this.divPos.bottom - 50) return;
            top += this.speed;
            this.ship.style.top = top + 'px';
        }if(this.controlKeys['ArrowUp']){
            if(top < this.divPos.top+20) return;
            top -= this.speed;
            this.ship.style.top = top + 'px';
        }if(this.controlKeys[" "]){
            this.shoot();
            this.controlKeys[" "] = false;
        }
    }

    changeBG(){
        //if(!isGameStart) return;
        this.mainGame = document.querySelector('.mainGame');

        if(this.mainGame.classList.contains('round1')){
            mainGame.classList.add('round2');
            mainGame.classList.remove('round1')
        }
        else if(this.mainGame.classList.contains('round2')){
            mainGame.classList.add('round3');
            mainGame.classList.remove('round2')
        }
        else if(this.mainGame.classList.contains('round3')){
            mainGame.classList.add('round4');
            mainGame.classList.remove('round3')

        }
        else if(this.mainGame.classList.contains('round4')){
            mainGame.classList.add('round5');
            mainGame.classList.remove('round4')

        }
    }


    spawn(){
        if(!this.isGameStart) return;
        this.ship = document.createElement('div');
        this.ship.classList.add('spaceShip');
        this.mainGame.append(this.ship);
        this.ship.style.left = this.divPos.left + (this.divPos.right - this.divPos.left)/2 + 'px'
        this.ship.style.top = this.divPos.top + (this.divPos.bottom - this.divPos.top)/1.2 + 'px'
    }

    spawnEnemies(){
        if(!this.isGameStart) return;
        this.enemies = document.querySelectorAll('.enemy');
        if(this.enemies.length != 0) return;
        for(let i=0; i<7; i++){
            const enemy = document.createElement('div');
            enemy.style.position = 'absolute';
            let rand = Math.floor(Math.random()*2);
            enemy.classList.add('enemy');
            if(rand == 1){
                enemy.classList.add('enemy2');
            }
            enemy.style.top = this.divPos.top + 'px';
            enemy.style.left = Math.floor(Math.random()*(this.divPos.right-this.divPos.left)*0.9)+ this.divPos.left + 30 + 'px';
            this.mainGame.append(enemy);
        }
    }

    startGame(){
        this.menu.style.display = 'none';
        this.header.classList.add('show');
        this.scoreDiv.classList.add('show'); 
        this.isGameStart = true;
        this.spawn();
        this.spawnEnemies();
        this.controls();
        setInterval(this.movement, 16);
        setInterval(this.bulletMovement, 16);
        setInterval(this.enemyMovement, 16);
        setInterval(this.spawnEnemies, 2000);
        setInterval(this.changeBG, 5000);
        this.theme.play();
    }

    controls(){
        if(!this.isGameStart) return;

        document.addEventListener('keydown', (e)=>{
            //console.log('hello')
            if(e.key == "ArrowRight"){
                this.controlKeys["ArrowRight"] = true;
            }if(e.key == "ArrowLeft"){
                this.controlKeys["ArrowLeft"] = true;
            }if(e.key == "ArrowDown"){
                this.controlKeys["ArrowDown"] = true;
            }if(e.key == "ArrowUp"){
                this.controlKeys["ArrowUp"] = true;
            }if (e.key == " "){
                this.controlKeys[" "] = true;
                const gun = this.gunSound.cloneNode();
                gun.play();
                gun.remove();
            }
        })
        document.addEventListener('keyup', (e)=>{
            if(e.key == "ArrowRight"){
                this.controlKeys["ArrowRight"] = false;
                this.ship.classList.remove('right');
            }if(e.key == "ArrowLeft"){
                this.controlKeys["ArrowLeft"] = false;
                this.ship.classList.remove('left');
            }if(e.key == "ArrowDown"){
                this.controlKeys["ArrowDown"] = false;
            }if(e.key == "ArrowUp"){
                this.controlKeys["ArrowUp"] = false;
            }if(e.key == " "){
                this.controlKeys[" "] = false;
            }
        })
    }

    enemyMovement(){
        //if(!isGameStart) return;
        const enemies = document.querySelectorAll('.enemy');
        const divPos = this.divPos;
        enemies.forEach(enemy => {
            let pos = enemy.getBoundingClientRect();
            if(pos.top > divPos['bottom'] - 40){
                enemy.remove();
            }
            enemy.style.top = pos.top + 1 + 'px';
        });
    }

    shoot(){
        if(!this.isGameStart) return;
        const ship = document.querySelector('.spaceShip').getBoundingClientRect();
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = ship.left + 16 + 'px';
        bullet.style.top = ship.top + 'px';
        this.mainGame.append(bullet);
    }

    bulletMovement(){
        //if(!this.isGameStart) return;
        this.scoreCon = document.getElementById('score');
        this.scoreCon.innerText = this.score;
        const bullets = document.querySelectorAll('.bullet');
        const divPos = this.divPos;
        bullets.forEach(bullet => {
            let bulletPos = bullet.getBoundingClientRect();
            bullet.style.top = bulletPos.top - this.bulletSpeed + 'px';
            this.checkBulletHit();
            if(parseInt(bullet.style.top) < divPos['top']){
                bullet.remove();
            }
        });
    }

    checkBulletHit(){

        const bullets = document.querySelectorAll('.bullet');
        const enemies = document.querySelectorAll('.enemy');

        bullets.forEach(bullet => {
            let bulletPos = bullet.getBoundingClientRect();
            
            enemies.forEach(enemy => {
                let enemyPos = enemy.getBoundingClientRect();
                if(Math.abs(bulletPos.left - enemyPos.left) < 30 && Math.abs(bulletPos.top - enemyPos.top) < 20){
                    this.score += 10;
                    this.explodeSound.play();
                    this.explode(enemyPos.left, enemyPos.top);
                    enemy.remove();
                    bullet.remove();
                }
            });

        });
    }

    explode(x, y){
        //if(!isGameStart) return;

        const explosion = document.createElement('div');
        explosion.classList.add('explode');
        explosion.style.position = 'absolute'
        explosion.style.left = x + 'px';
        explosion.style.top = y + 'px';
        this.mainGame.appendChild(explosion);
        setTimeout(this.explodeRemove, 500);
    }

    explodeRemove(){
        const explode = document.querySelector('.explode')
        explode.remove();
    }
}
    
const spaceGame = new SpaceGame();
document.getElementById('start').addEventListener('click', function(){
    spaceGame.startGame();
})


    
