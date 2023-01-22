//Classes
class Singer {
    constructor(name, fullName, pathPhoto, lives, xPosition=300, yPosition=180) {
        this.name = name;
        this.fullName = fullName
        this.pathPhoto = pathPhoto;
        this.lives = lives;
        this.attacks = [];
        this.xPosition = xPosition;
        this.xSpeed = 0;
        this.yPosition = yPosition;
        this.ySpeed = 0;
        this.width = 120;
        this.height = 240;
        this.image = new Image();
        this.image.src = pathPhoto;
    }

    showSinger() {
        canva.drawImage(this.image, this.xPosition,
            this.yPosition, this.width, this.height);   
    }
}

//Sections
const attackChoiceSection = document.getElementById('attack-choice-section');
const singerChoiceSection = document.getElementById('singer-choice-section');
const resetGameSection = document.getElementById('reset-game-section');
const seeMapSection = document.getElementById('see-map');

//Canva
const map = document.getElementById('map')

//Buttons
const resetButton = document.getElementById('reset-game-button');
const singerPlayerButton = document.getElementById('select-singer-button');

///Paragraphs
const playerWinsParagraph = document.getElementById('player-wins');
const enemyWinsParagraph = document.getElementById('enemy-wins');
const resultParagraph = document.getElementById('result');
const singerPlayerNameParagraph = document.getElementById('singer-player-name');
const singerEnemyNameParagraph = document.getElementById('singer-enemy-name');

//Divs
const enemyAttackDivision = document.getElementById('enemy-attack');
const playerAttackDivision = document.getElementById('player-attack');
const cardsDivision = document.getElementById('cards-container');
const attacksDivision = document.getElementById('attacks-container');

//Radios
let theWeekndRadio;
let michaelJacksonRadio;
let brunoMarsRadio;

//Functionals
let singers = [];
let currentAttackButtons = [];
let playerAttacks = [];
let enemyAttacks = [];
let singerOptions;
let playerWins = 0;
let enemyWins = 0;
var selectedPlayerSinger;
var selectedEnemySinger;
let canva = map.getContext('2d');
let interval;
let backgroundMap = new Image();
backgroundMap.src = './assets/concert-scene.png';
let canvaWitdh = window.innerWidth - 20;
let canvaHeigt = canvaWitdh * (600/1200);

//Singers Objects
let theWeeknd = new Singer('theWeeknd', 'The Weeknd', './assets/the-weeknd.png', 3);
let michaelJackson = new Singer('michaelJackson', 'Michael Jackson', './assets/michael-jackson.png', 3);
let brunoMars = new Singer('brunoMars', 'Bruno Mars', './assets/bruno-mars.png', 3);

theWeeknd.attacks.push(
    { name: 'SING 🎤', id: 'sing-button', level: 5 },
    { name: 'COMPOSE 💡🗓', id: 'compose-button', level: 4 },
    { name: 'DANCE 🕺🏾', id: 'dance-button', level: 1 },
    { name: 'SING 🎤 AND DANCE 🕺🏾', id: 'sing-dance-button', level: 3 },
    { name: 'NEW ALBUM 💽', id: 'new-album-button', level: 4 }
)

michaelJackson.attacks.push(
    { name: 'SING 🎤', id: 'sing-button', level: 5 },
    { name: 'COMPOSE 💡🗓', id: 'compose-button', level: 4 },
    { name: 'DANCE 🕺🏾', id: 'dance-button', level: 5 },
    { name: 'SING 🎤 AND DANCE 🕺🏾', id: 'sing-dance-button', level: 5 },
    { name: 'CONCERT 📆🔊', id: 'concert-button', level: 4 }
)

brunoMars.attacks.push(
    { name: 'SING 🎤', id: 'sing-button', level: 4 },
    { name: 'NEW ALBUM 💽', id: 'new-album-button', level: 3 },
    { name: 'DANCE 🕺🏾', id: 'dance-button', level: 5},
    { name: 'SING 🎤 AND DANCE 🕺🏾', id: 'sing-dance-button', level: 4 },
    { name: 'CONCERT 📆🔊', id: 'concert-button', level: 3 }
)

singers.push(theWeeknd, michaelJackson, brunoMars);


function startGame() {
    attackChoiceSection.style.display = 'none';
    resetGameSection.style.display = 'none';
    seeMapSection.style.display = 'none';

    singers.forEach(singer => {
        singerOptions = `
            <input type="radio" name="singer" id="${singer.name}" />
            <label class="singer-card" for="${singer.name}">
                <p>${singer.fullName}</p>
                <img src="${singer.pathPhoto}" alt="${singer.name}">
            </label>
        `;
        cardsDivision.innerHTML += singerOptions;
    });

    theWeekndRadio = document.getElementById('theWeeknd');
    michaelJacksonRadio = document.getElementById('michaelJackson');
    brunoMarsRadio = document.getElementById('brunoMars');

    playerWinsParagraph.innerHTML = playerWins;
    enemyWinsParagraph.innerHTML = enemyWins;

    singerPlayerButton.addEventListener('click', selectSingerPlayer);
    resetButton.addEventListener('click', resetGame);
}

function selectSingerPlayer(){
    if (theWeekndRadio.checked){
        selectedPlayerSinger = theWeeknd;
    } else if (michaelJacksonRadio.checked){
        selectedPlayerSinger = michaelJackson;
    } else if (brunoMarsRadio.checked) {
        selectedPlayerSinger = brunoMars;
    }

    if (selectedPlayerSinger) {
        selectSingerEnemy();
        singerPlayerNameParagraph.innerHTML = selectedPlayerSinger.fullName;
        singerEnemyNameParagraph.innerHTML = selectedEnemySinger.fullName;
        createButtonsAttacks(selectedPlayerSinger);
        singerChoiceSection.style.display = 'none';
        seeMapSection.style.display = 'flex'; 
        startCanva();
    }
    else {
        alert('You must select a singer');
    }
}

function selectSingerEnemy(){
    let newSingers = singers.filter(function(singer) {return singer.name !== selectedPlayerSinger.name})
    selectedEnemySinger = newSingers[ramdom(0,newSingers.length - 1)];
    selectedEnemySinger.xPosition = 800;
}

function selectEnemyAttack(){
    selectedEnemySinger.attacks.length
    let attack = ramdom(0,selectedEnemySinger.attacks.length - 1);
    enemyAttack = selectedEnemySinger.attacks[attack];
    enemyAttacks.push(enemyAttack);

    if (playerAttacks.length === 4){
        figth();
    }
}

function createMessage(result, enemyAttack, playerAttack){

    let newEnemyAttack = document.createElement('p');
    let newPlayerAttack = document.createElement('p');
    newEnemyAttack.innerHTML = `${enemyAttack.name}: level ${enemyAttack.level}`;
    newPlayerAttack.innerHTML = `${playerAttack.name}: level ${playerAttack.level}`;

    enemyAttackDivision.appendChild(newEnemyAttack);
    playerAttackDivision.appendChild(newPlayerAttack);
    resultParagraph.innerHTML = result;
}

function createFinishMessage(finalResult) {
    resultParagraph.innerHTML = finalResult;
}

function ramdom(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}

function figth(){

    for (let i = 0; i <= playerAttacks.length - 1; i++){
        if (playerAttacks[i].level == enemyAttacks[i].level) {
            result = "You are tie";
        }
        else if (playerAttacks[i].level > enemyAttacks[i].level) {
            playerWins ++;
            playerWinsParagraph.innerHTML = `Wins: ${playerWins}`;
            result = "You Win!! 🎉";
        }
        else {
            enemyWins ++;
            enemyWinsParagraph.innerHTML = `Wins: ${enemyWins}`;
            result = "You Loose!! 💀";
        }
        createMessage(result, enemyAttacks[i], playerAttacks[i]);
    }
    checkWinner();
}

function checkWinner(){
    if (playerWins > enemyWins){
        createFinishMessage("🎉Congratulations!! you're the Winner'!!🎉");
    } else if (playerWins < enemyWins){
        createFinishMessage("💀Bad news!! you're the Loseer!!💀");
    }
    else {
        createFinishMessage("😐It's a tie. Nobody wins.😐");
    }
    disableButtonsAttack(true);
    resetGameSection.style.display = 'block';
}

function checkCrash() {
    const upEnemySinger = selectedEnemySinger.yPosition;
    const downEnemySinger = selectedEnemySinger.yPosition + selectedEnemySinger.height;
    const leftEnemySinger = selectedEnemySinger.xPosition;
    const rigthEnemySinger = selectedEnemySinger.xPosition + selectedEnemySinger.width;

    const upPlayerSinger = selectedPlayerSinger.yPosition;
    const downPlayerSinger = selectedPlayerSinger.yPosition + selectedPlayerSinger.height;
    const leftPlayerSinger = selectedPlayerSinger.xPosition;
    const rigthPlayerSinger = selectedPlayerSinger.xPosition + selectedPlayerSinger.width;

    if (downPlayerSinger < upEnemySinger || 
        upPlayerSinger > downEnemySinger ||
        rigthPlayerSinger < leftEnemySinger ||
        leftPlayerSinger > rigthEnemySinger){
            return false;
        }
    stopSingerMove();
    clearInterval(interval);
    seeMapSection.style.display = 'none'; 
    attackChoiceSection.style.display = 'flex';
}

function createButtonsAttacks(selectedSinger) {
    selectedSinger.attacks.forEach(attack => {
        attackData = `
        <button id="${attack.id}" class="attack-button" disabled>${attack.name}</button>
        `
        attacksDivision.innerHTML += attackData;
        currentAttackButtons.push(attack.id);
    });
    createEventListener();
    disableButtonsAttack(false);
}

function disableButtonsAttack(isDisabled){
    currentAttackButtons.forEach(button => {
        document.getElementById(button).disabled = isDisabled
    });
}

function createEventListener() {
    currentAttackButtons.forEach((button) => {
        let buttonElement = document.getElementById(button);
        buttonElement.addEventListener('click', (e) => {
            playerAttack = selectedPlayerSinger.attacks.find(attack => attack.id === e.target.id);
            playerAttacks.push(playerAttack);
            selectEnemyAttack();
            buttonElement.style.background = '#E6E2C3'
            buttonElement.disabled = true
        })
    });
}

function resetGame(){
    location.reload();
}

function  startCanva(){
    map.width = canvaWitdh;
    map.height = canvaHeigt;
    interval = setInterval(drawImageOnCanva, 100);
    window.addEventListener('keydown', moveSinger);
    window.addEventListener('keyup', stopSingerMove);
} 

function drawImageOnCanva() {
    canva.clearRect(0,0, map.width, map.height);
    canva.drawImage(backgroundMap, 0, 0, map.width, map.height);
    selectedPlayerSinger.xPosition += selectedPlayerSinger.xSpeed; 
    selectedPlayerSinger.yPosition += selectedPlayerSinger.ySpeed;
    selectedPlayerSinger.showSinger();
    selectedEnemySinger.showSinger();
    if (selectedPlayerSinger.xSpeed !== 0 || selectedPlayerSinger.ySpeed !== 0){
        checkCrash();
    }
}


function moveSinger(event) {
    switch(event.key) {
        case 'ArrowUp':
            moveSingerUp()
            break;
        case 'ArrowDown':
            moveSingerDown()
            break;
        case 'ArrowLeft':
            moveSingerLeft()
            break;
        case 'ArrowRight':
            moveSingerRigth()
            break;
    }
}


function moveSingerUp() {
    selectedPlayerSinger.ySpeed = -6;
    drawImageOnCanva();
}

function moveSingerLeft() {
    selectedPlayerSinger.xSpeed = -6;
}

function moveSingerDown() {
    selectedPlayerSinger.ySpeed = 6;
}

function moveSingerRigth() {
    selectedPlayerSinger.xSpeed = 6;
}

function stopSingerMove() {
    selectedPlayerSinger.xSpeed = 0;
    selectedPlayerSinger.ySpeed = 0;
}

window.addEventListener('load', startGame);