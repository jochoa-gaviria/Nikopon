let playerAttack
let enemyAttack
let playerLives = 3
let enemyLives = 3

function startGame() {
    document.getElementById('atack-choice-section').style.display = 'none'
    document.getElementById('reset-game-section').style.display = 'none'

    let petPlayerButton = document.getElementById('pet-button')
    petPlayerButton.addEventListener('click', selectPetPlayer)

    let fireButton = document.getElementById('fire-button')
    fireButton.addEventListener('click', fireAttack)
    let waterButton = document.getElementById('water-button')
    waterButton.addEventListener('click', waterAttack)
    let landButton = document.getElementById('land-button')
    landButton.addEventListener('click', landAttack)
    let resetButton = document.getElementById('reset-game-button')
    resetButton.addEventListener('click', resetGame)

    document.getElementById('player-lives').innerHTML = playerLives
    document.getElementById('enemy-lives').innerHTML = enemyLives
}

function selectPetPlayer(){
    let hipodogeRadio = document.getElementById('hipodoge')
    let capipepoRadio = document.getElementById('capipepo')
    let ratigueyaRadio = document.getElementById('ratigueya')

    var selectedPet
    if (hipodogeRadio.checked){
        selectedPet = "hipodoge"
    } else if (capipepoRadio.checked){
        selectedPet = "cepipepo"
    } else if (ratigueyaRadio.checked) {
        selectedPet = "ratigueya"
    }


    if (selectedPet) {
        document.getElementById('pet-player-name').innerHTML = selectedPet
        document.getElementById('pet-enemy-name').innerHTML = selectPetEnemy()
        document.getElementById('atack-choice-section').style.display = 'block'
        document.getElementById('pet-choice-section').style.display = 'none'
        enabledButtonsAttack()
    }
    else {
        alert('Por favor selecciona una mascota')
    }
}

function selectPetEnemy(){
    let pet = ramdom(1,3)
    switch(pet){
        case 1:{
            return "hipodoge"
        }
        case 2:{
            return "capipepo"
        }
        case 3:{
            return "ratigueya"
        }
    }
}

function fireAttack(){
    playerAttack = "FIRE"
    selectEnemyAttack()
}

function waterAttack(){
    playerAttack = "WATER"
    selectEnemyAttack()
}

function landAttack(){
    playerAttack = "LAND"
    selectEnemyAttack()
}

function selectEnemyAttack(){
    let attack = ramdom(1,3)
    switch(attack){
        case 1:{
            enemyAttack = "FIRE"
            break
        }
        case 2:{
            enemyAttack = "WATER"
            break
        }
        case 3:{
            enemyAttack = "LAND"
            break
        }
    }
    let result = figth()
    createMessage(result)
    checkLives()
}

function createMessage(result){
    let paragraph = document.createElement('p')
    paragraph.innerHTML = `Your pet attacked with ${playerAttack}, your enemy pet attacked with ${enemyAttack} - ${result}`
    document.getElementById('messages-section').appendChild(paragraph)
}

function createFinishMessage(finalResult){
    let paragraph = document.createElement('p')
    paragraph.innerHTML = finalResult
    document.getElementById('messages-section').appendChild(paragraph)
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
    if (playerAttack == "FIRE" && enemyAttack == "LAND") {
        enemyLives --
        spanEnemyLives.innerHTML = enemyLives
        return "You Win!! 🎉" 
    }
    if (playerAttack == "WATER" && enemyAttack == "FIRE") {
        enemyLives --
        spanEnemyLives.innerHTML = enemyLives
        return "You Win!! 🎉"
    } 
    if (playerAttack == "LAND" && enemyAttack == "WATER") {
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
        createFinishMessage("Congratulations!!! you've won!! 🎉🎉🎉");
        disableButtonsAttack();
        document.getElementById('reset-game-section').style.display = 'block';
    } else if (playerLives == 0){
        createFinishMessage("Bad news!!! you've lost!! 💀💀💀");
        disableButtonsAttack();
        document.getElementById('reset-game-section').style.display = 'block';
    }
}

function disableButtonsAttack(){
    document.getElementById('fire-button').disabled = true;
    document.getElementById('water-button').disabled = true;
    document.getElementById('land-button').disabled = true;
}

function enabledButtonsAttack(){
    document.getElementById('fire-button').disabled = false;
    document.getElementById('water-button').disabled = false;
    document.getElementById('land-button').disabled = false;
}

function resetGame(){
    location.reload();
}

window.addEventListener('load', startGame)