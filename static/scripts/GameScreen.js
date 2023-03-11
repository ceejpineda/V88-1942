class GameScreen{

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

    appendElements(element){
        element.style.left = this.divPos.left + (this.divPos.right - this.divPos.left)/2 + 'px'
        element.style.top = this.divPos.top + (this.divPos.bottom - this.divPos.top)/1.2 + 'px'
        this.mainGame.append(element);
    }

    append(element){
        this.mainGame.append(element);
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

}
