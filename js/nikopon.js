let playerAttack
let enemyAttack
let playerLives = 3
let enemyLives = 3

function startGame() {
    document.getElementById('attack-choice-section').style.display = 'none'
    document.getElementById('reset-game-section').style.display = 'none'

    let singerPlayerButton = document.getElementById('select-singer-button')
    singerPlayerButton.addEventListener('click', selectSingerPlayer)

    let singButton = document.getElementById('sing-button')
    singButton.addEventListener('click', singAttack)
    let singDanceButton = document.getElementById('sing-dance-button')
    singDanceButton.addEventListener('click', singDanceAttack)
    let danceButton = document.getElementById('dance-button')
    danceButton.addEventListener('click', danceAttack)
    let resetButton = document.getElementById('reset-game-button')
    resetButton.addEventListener('click', resetGame)

    document.getElementById('player-lives').innerHTML = playerLives
    document.getElementById('enemy-lives').innerHTML = enemyLives
}

function selectSingerPlayer(){
    let theWeekndRadio = document.getElementById('theWeeknd')
    let michaelJacksonRadio = document.getElementById('michaelJackson')
    let brunoMarsRadio = document.getElementById('brunoMars')

    var selectedSinger
    if (theWeekndRadio.checked){
        selectedSinger = "The Weeknd"
    } else if (michaelJacksonRadio.checked){
        selectedSinger = "Michael Jackson"
    } else if (brunoMarsRadio.checked) {
        selectedSinger = "Bruno Mars"
    }


    if (selectedSinger) {
        document.getElementById('singer-player-name').innerHTML = selectedSinger
        document.getElementById('singer-enemy-name').innerHTML = selectSingerEnemy()
        document.getElementById('attack-choice-section').style.display = 'flex'
        document.getElementById('singer-choice-section').style.display = 'none'
        enabledButtonsAttack()
    }
    else {
        alert('Por favor selecciona un cantante')
    }
}

function selectSingerEnemy(){
    let pet = ramdom(1,3)
    switch(pet){
        case 1:{
            return "The Weeknd"
        }
        case 2:{
            return "Michael Jackson"
        }
        case 3:{
            return "Bruno Mars"
        }
    }
}

function singAttack(){
    playerAttack = "SING"
    selectEnemyAttack()
}

function singDanceAttack(){
    playerAttack = "SING-DANCE"
    selectEnemyAttack()
}

function danceAttack(){
    playerAttack = "DANCE"
    selectEnemyAttack()
}

function selectEnemyAttack(){
    let attack = ramdom(1,3)
    switch(attack){
        case 1:{
            enemyAttack = "SING"
            break
        }
        case 2:{
            enemyAttack = "SING-DANCE"
            break
        }
        case 3:{
            enemyAttack = "DANCE"
            break
        }
    }
    let result = figth()
    createMessage(result)
    checkLives()
}

function createMessage(result){

    let newEnemyAttack = document.createElement('p');
    let newPlayerAttack = document.createElement('p');

    newEnemyAttack.innerHTML = enemyAttack;
    newPlayerAttack.innerHTML = playerAttack;

    document.getElementById('enemy-attack').appendChild(newEnemyAttack);
    document.getElementById('player-attack').appendChild(newPlayerAttack);

    document.getElementById('result').innerHTML = result;
}

function createFinishMessage(finalResult){
    document.getElementById('result').innerHTML = finalResult;
}

function ramdom(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min)
}

function figth(){
    let spanPlayerLives = document.getElementById('player-lives')
    let spanEnemyLives = document.getElementById('enemy-lives')

    if (enemyAttack == playerAttack) {
        return "You are tie"
    }
    if (playerAttack == "SING" && enemyAttack == "DANCE") {
        enemyLives --
        spanEnemyLives.innerHTML = enemyLives
        return "You Win!! 🎉" 
    }
    if (playerAttack == "SING-DANCE" && enemyAttack == "SING") {
        enemyLives --
        spanEnemyLives.innerHTML = enemyLives
        return "You Win!! 🎉"
    } 
    if (playerAttack == "SING-DANCE" && enemyAttack == "DANCE") {
        enemyLives --
        spanEnemyLives.innerHTML = enemyLives
        return "You Win!! 🎉"
    }
    playerLives -- 
    spanPlayerLives.innerHTML = playerLives
    return "You Loose!! 💀"
}

function checkLives(){
    if (enemyLives == 0){
        createFinishMessage("🎉Congratulations!! you've won!!🎉");
        disableButtonsAttack();
        document.getElementById('reset-game-section').style.display = 'block';
    } else if (playerLives == 0){
        createFinishMessage("💀Bad news!! you've lost!!💀");
        disableButtonsAttack();
        document.getElementById('reset-game-section').style.display = 'block';
    }
}

function disableButtonsAttack(){
    document.getElementById('sing-button').disabled = true;
    document.getElementById('sing-dance-button').disabled = true;
    document.getElementById('dance-button').disabled = true;
}

function enabledButtonsAttack(){
    document.getElementById('sing-button').disabled = false;
    document.getElementById('sing-dance-button').disabled = false;
    document.getElementById('dance-button').disabled = false;
}

function resetGame(){
    location.reload();
}

window.addEventListener('load', startGame)