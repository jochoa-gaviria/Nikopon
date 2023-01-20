//Classes
class Singer {
    constructor(name, fullName, pathPhoto, lives) {
        this.name = name;
        this.fullName = fullName
        this.pathPhoto = pathPhoto;
        this.lives = lives;
        this.attacks = []
    }
}

//Sections
const attackChoiceSection = document.getElementById('attack-choice-section');
const singerChoiceSection = document.getElementById('singer-choice-section');
const resetGameSection = document.getElementById('reset-game-section');

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
        attackChoiceSection.style.display = 'flex';
        singerChoiceSection.style.display = 'none';
    }
    else {
        alert('You must select a singer');
    }
}

function selectSingerEnemy(){
    selectedEnemySinger = singers[ramdom(0,singers.length - 1)];
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
        console.log(result);
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
        createFinishMessage("😐Try again, it's a tie. Nobody wins.😐");
    }
    disableButtonsAttack(true);
    resetGameSection.style.display = 'block';
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

window.addEventListener('load', startGame);