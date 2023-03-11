class SpaceShip{
    
    constructor(playerID){
        this.playerID = playerID;
        this.controlKeys = {
            'ArrowRight':false,
            'ArrowLeft':false,
            'ArrowUp':false,
            'ArrowDown':false,
            ' ': false,
        }
        this.ship = '';
        this.shipPosition = '';
        this.divPos = document.querySelector('.mainGame').getBoundingClientRect();
        this.left = '';
        this.top = ''; 
        this.speed = 5;
        this.shipMovement = this.shipMovement.bind(this);
        this.gunSound = new Audio();
        this.gunSound.src = '/assets/gun.wav';
    }

    getPos(){
        this.shipPosition = this.ship.getBoundingClientRect();
        return this.shipPosition;
    }

    spawn(){
        this.ship = document.createElement('div');
        this.ship.classList.add('spaceShip');
        this.ship.id = this.playerID;
        return this.ship;
    }

    shipMovement(){
        this.ship = document.getElementById(this.playerID);
        this.shipPosition = this.ship.getBoundingClientRect();
        this.left = this.shipPosition.left;
        this.top = this.shipPosition.top;
        if(this.controlKeys["ArrowRight"]){
            this.left += this.speed;
            this.ship.classList.add('right');
            this.ship.style.left = this.left + 'px';
        }if(this.controlKeys['ArrowLeft']){
            if(this.left < this.divPos.left+8) return;
            this.left -= this.speed;
            this.ship.classList.add('left');
            this.ship.style.left = this.left + 'px';
        }if(this.controlKeys['ArrowDown']){
            if(this.top > this.divPos.bottom - 50) return;
            this.top += this.speed;
            this.ship.style.top = this.top + 'px';
        }if(this.controlKeys['ArrowUp']){
            if(this.top < this.divPos.top+20) return;
            this.top -= this.speed;
            this.ship.style.top = this.top + 'px';
        }if(this.controlKeys[" "]){
            //this.shoot();
            this.controlKeys[" "] = false;
        }
    }

    updatePosition(){
        this.ship = document.getElementById(this.playerID);
        this.ship.style.left = this.left + 'px';
        this.ship.style.top = this.top + 'px';
    }

    controls(){
        document.addEventListener('keydown', (e)=>{
            console.log('hello')
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

    shoot(){
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        return bullet;
        // gameScreen.appendElements(bullet);
        // console.log(bullet);
        // bullet.style.left = this.left + 12 + 'px';
        // bullet.style.top = this.top + 'px';
        // console.log(bullet.style.left, bullet.style.top);
        // const gun = this.gunSound.cloneNode();
        // gun.play();
        // gun.remove();
    }
}