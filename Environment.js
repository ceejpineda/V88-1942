class Enemies{

    constructor(){
        this.enemies = '';
        this.enemy = [];
    }

    spawn(){
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
            this.enemy.push(enemy);
        }
        return this.enemy;
    }
    

}