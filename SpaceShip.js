export default class SpaceShip{
    
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
        this.left = ''; //Left property of the Ship (CSS) For Movement
        this.top = ''; //Top property of the Ship (CSS) For Movement
        this.speed = 5;
    }

    spawn(){
        this.ship = document.createElement('div');
        this.ship.classList.add('spaceShip');
        this.ship.style.left = this.divPos.left + (this.divPos.right - this.divPos.left)/(Math.random()*2) + 'px'
        this.ship.style.top = this.divPos.top + (this.divPos.bottom - this.divPos.top)/1.2 + 'px'
        return this.ship;
    }

    shipMovement(){
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
            this.shoot();
            this.controlKeys[" "] = false;
        }
    }
}