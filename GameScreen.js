export default class GameScreen{

    constructor(){
        this.mainGame = document.querySelector('.mainGame');
        this.divPos = this.mainGame.getBoundingClientRect();
        this.isGameStart = false;
        this.startButton = document.getElementById('start');
        this.header = document.querySelector('.header');
        this.scoreDiv = document.querySelector('.score');
        this.menu = document.querySelector('.menu')
    }

    startGame(){
        this.menu.style.display = 'none';
        this.header.classList.add('show');
        this.scoreDiv.classList.add('show');
    }
}
