class GameSound{

    constructor(){
        this.explodeSound = new Audio();
        this.explodeSound.src = './assets/explodeSound.wav';
        this.explodeSound.preload = 'auto';
        this.gunSound = new Audio();
        this.gunSound.src = './assets/gun.wav';
        this.gunSound.preload = 'auto';
        this.theme = document.getElementById('theme');
    }

    playTheme(){
        this.theme.play();
    }

    playExplode(){
        this.explodeSound.play();
    }

    playGunSound(){
        this.gunSound.play();
    }

}