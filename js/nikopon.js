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
const playerLivesParagraph = document.getElementById('player-lives');
const enemyLivesParagraph = document.getElementById('enemy-lives');
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
let playerAttack;
let playerAttacks = [];
let enemyAttack;
let enemyAttacks = [];
let singerOptions;
let playerLives = 3;
let enemyLives = 3;
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

    playerLivesParagraph.innerHTML = playerLives;
    enemyLivesParagraph.innerHTML = enemyLives;

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
    console.log(enemyAttacks)

    let result = figth();
    createMessage(result);
    checkLives();
}

function createMessage(result){

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
    if (playerAttack.level == enemyAttack.level) {
        return "You are tie";
    }
    if (playerAttack.level > enemyAttack.level) {
        enemyLives --;
        return "You Win!! 🎉";
    }
    playerLives --;
    playerLivesParagraph.innerHTML = playerLives;
    return "You Loose!! 💀";
}

function checkLives(){
    if (enemyLives == 0){
        createFinishMessage("🎉Congratulations!! you've won!!🎉");
        disableButtonsAttack(true);
        resetGameSection.style.display = 'block';
    } else if (playerLives == 0){
        createFinishMessage("💀Bad news!! you've lost!!💀");
        disableButtonsAttack(true);
        resetGameSection.style.display = 'block';
    }
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
            console.log(playerAttacks);
            selectEnemyAttack();
            buttonElement.style.background = '#E6E2C3'
        })
    });
}

function resetGame(){
    location.reload();
}

window.addEventListener('load', startGame);