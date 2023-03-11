class Environment{

    constructor(){
        this.enemies = '';
        this.enemy = [];
        this.enemyDetails = [];
        this.mainGame = document.querySelector('.mainGame');
        this.divPos = this.mainGame.getBoundingClientRect();
        this.bulletSpeed = 10;
        this.bulletMovement = this.bulletMovement.bind(this);
        this.spawnEnemy = this.spawnEnemy.bind(this);
        this.enemyMovement = this.enemyMovement.bind(this);
        this.checkBulletHit = this.checkBulletHit.bind(this);
        this.explodeSound = new Audio();
        this.explodeSound.src = './assets/explodeSound.wav';
        this.explodeSound.preload = 'auto';
        this.gunSound = new Audio();
        this.gunSound.src = './assets/gun.wav';
        this.gunSound.preload = 'auto'
        this.scoreCon = document.getElementById('score');
        this.score = 0;
    }

    spawnEnemy(){
        this.enemy = [];
        this.enemies = document.querySelectorAll('.enemy');
        let divPos = this.divPos;
        if(this.enemies.length != 0) return;

        const enemyCount = 7;
        const enemyWidth = 55;
        const spaceBetween = (divPos.width - 10 - enemyCount*enemyWidth) / (enemyCount);
        console.log(enemyCount*enemyWidth, spaceBetween)

        for(let i=0; i<7; i++){
            const enemy = document.createElement('div');
            const offset = Math.floor(Math.random() * spaceBetween * 0.8) - spaceBetween * 0.4;
            const enemyType = Math.floor(Math.random()*3 + 1);
            enemy.style.position = 'absolute';
            enemy.classList.add('enemy');
            enemy.classList.add('enemy' + enemyType);
            enemy.style.top = divPos.top + 'px';
            enemy.style.left = divPos.left + spaceBetween * (i+1) + enemyWidth * i + offset + 'px';
            const enemyDetails = {
                position: {
                  top: divPos.top + 'px',
                  left: divPos.left + spaceBetween * (i+1) + enemyWidth * i + offset + 'px'
                },
                classes: ['enemy', 'enemy' + enemyType]
            };
            //this.mainGame.append(enemy);
            this.enemyDetails.push(enemyDetails);
            this.enemy.push(enemy);
        }
        return this.enemy;
    }
    
    bulletMovement(){
        //if(!this.isGameStart) return;
        //this.scoreCon = document.getElementById('score');
        this.scoreCon.innerText = this.score;
        const bullets = document.querySelectorAll('.bullet');
        const divPos = this.divPos;
        bullets.forEach(bullet => {
            let bulletPos = bullet.getBoundingClientRect();
            bullet.style.top = bulletPos.top - this.bulletSpeed + 'px';
            //this.checkBulletHit();
            if(parseInt(bullet.style.top) < divPos['top']){
                bullet.remove();
            }
        });
    }

    enemyMovement(){
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