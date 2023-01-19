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
const singButton = document.getElementById('sing-button');
const danceButton = document.getElementById('dance-button');
const singDanceButton = document.getElementById('sing-dance-button');
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
const cardsDivision = document.getElementById('cards-container')

//Radios
let theWeekndRadio;
let michaelJacksonRadio;
let brunoMarsRadio;

//Functionals
let singers = [];
let playerAttack;
let enemyAttack;
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
    { name: 'DANCE 🕺🏾', id: 'dance-button', level: 1},
    { name: 'SING 🎤 AND DANCE 🕺🏾', id: 'sing-dance-button', level: 3 },
    { name: 'NEW ALBUM 💽', id: 'new-album-button', level: 4 }
)

michaelJackson.attacks.push( 
    { name: 'SING 🎤', id: 'sing-button' , level: 5},
    { name: 'COMPOSE 💡🗓', id: 'compose-button', level: 5 },
    { name: 'DANCE 🕺🏾', id: 'dance-button', level: 5},
    { name: 'SING 🎤 AND DANCE 🕺🏾', id: 'sing-dance-button', level: 5 },
    { name: 'CONCERT 📆🔊', id: 'concert-button', level: 5 }
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
    singButton.addEventListener('click', singAttack);
    singDanceButton.addEventListener('click', singDanceAttack);
    danceButton.addEventListener('click', danceAttack);
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
        attackChoiceSection.style.display = 'flex';
        singerChoiceSection.style.display = 'none';
        disableButtonsAttack(false);
    }
    else {
        alert('You must select a singer');
    }
}

function selectSingerEnemy(){
    let selectedSingerEnemyRamdom = ramdom(1,3);
    switch(selectedSingerEnemyRamdom){
        case 1:{
            selectedEnemySinger = theWeeknd;
            return;
        }
        case 2:{
            selectedEnemySinger = michaelJackson;
            return;
        }
        case 3:{
            selectedEnemySinger = brunoMars;
            return;
        }
    }
}

function singAttack(){
    playerAttack = "SING";
    selectEnemyAttack();
}

function singDanceAttack(){
    playerAttack = "SING-DANCE";
    selectEnemyAttack();
}

function danceAttack(){
    playerAttack = "DANCE";
    selectEnemyAttack();
}

function selectEnemyAttack(){
    let attack = ramdom(1,3)
    switch(attack){
        case 1:{
            enemyAttack = "SING";
            break;
        }
        case 2:{
            enemyAttack = "SING-DANCE";
            break;
        }
        case 3:{
            enemyAttack = "DANCE";
            break;
        }
    }
    let result = figth();
    createMessage(result);
    checkLives();
}

function createMessage(result){

    let newEnemyAttack = document.createElement('p');
    let newPlayerAttack = document.createElement('p');
    newEnemyAttack.innerHTML = enemyAttack;
    newPlayerAttack.innerHTML = playerAttack;

    enemyAttackDivision.appendChild(newEnemyAttack);
    playerAttackDivision.appendChild(newPlayerAttack);
    resultParagraph.innerHTML = result;
}

function createFinishMessage(finalResult){
    resultParagraph.innerHTML = finalResult;
}

function ramdom(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min);
}

function figth(){
    if (enemyAttack == playerAttack) {
        return "You are tie";
    }
    if (playerAttack == "SING" && enemyAttack == "DANCE") {
        enemyLives --;
        enemyLivesParagraph.innerHTML = enemyLives;
        return "You Win!! 🎉";
    }
    if (playerAttack == "SING-DANCE" && enemyAttack == "SING") {
        enemyLives --;
        enemyLivesParagraph.innerHTML = enemyLives;
        return "You Win!! 🎉";
    } 
    if (playerAttack == "SING-DANCE" && enemyAttack == "DANCE") {
        enemyLives --;
        enemyLivesParagraph.innerHTML = enemyLives;
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

function disableButtonsAttack(isDisabled){
    singButton.disabled = isDisabled;
    danceButton.disabled = isDisabled;
    singDanceButton.disabled = isDisabled;
}

function resetGame(){
    location.reload();
}

window.addEventListener('load', startGame);