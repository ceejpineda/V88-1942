import GameScreen from "./GameScreen.js";
import SpaceShip from "./SpaceShip.js";

var socket = io();
            
socket.emit('new_connection');


const gameScreen = new GameScreen();
const startButton = document.getElementById('start');

startButton.addEventListener('click', function(){
    gameScreen.startGame();
}); 