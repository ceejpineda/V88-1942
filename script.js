const spaceGame = (() =>{

    const speed = 5;
    const mainGame = document.querySelector('.mainGame');
    const divPos = mainGame.getBoundingClientRect();
    const controlKeys = {
        'ArrowRight':false,
        'ArrowLeft':false,
        'ArrowUp':false,
        'ArrowDown':false,
        ' ': false,
    }

    const spawn = () =>{
        const ship = document.createElement('div');
        ship.classList.add('spaceShip');
        mainGame.append(ship);
        ship.style.left = divPos.left + (divPos.right - divPos.left)/2 + 'px'
        ship.style.top = divPos.top + (divPos.bottom - divPos.top)/1.2 + 'px'
    }

    const movement = () =>{
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
        const bullets = document.querySelectorAll('.bullet');
        console.log(bullets);

        bullets.forEach(bullet => {
            bullet.getBoundingClientRect();
            console.log(bullet.top)
            bullet.style.top = bullet.top - 10 + 'px';
        });
    }

    const controls = () =>{
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
        const ship = document.querySelector('.spaceShip').getBoundingClientRect();
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = ship.left + 16 + 'px';
        bullet.style.top = ship.top + 'px';
        mainGame.append(bullet);
    }

    return {spawn, controls, movement, bulletMovement}

})();

spaceGame.spawn();
spaceGame.controls();

setInterval(spaceGame.movement, 50)
setInterval(spaceGame.bulletMovement, 50)

