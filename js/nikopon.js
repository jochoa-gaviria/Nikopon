let playerAttack
let enemyAttack

function startGame() {
    let petPlayerButton = document.getElementById('pet-button')
    petPlayerButton.addEventListener('click', selectPetPlayer)

    let fireButton = document.getElementById('fire-button')
    fireButton.addEventListener('click', fireAttack)
    let waterButton = document.getElementById('water-button')
    waterButton.addEventListener('click', waterAttack)
    let landButton = document.getElementById('land-button')
    landButton.addEventListener('click', landAttack)
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
    createMessage()
}

function createMessage(){
    let paragraph = document.createElement('p')
    paragraph.innerHTML = `Your pet attacked with ${playerAttack}, your enemy pet attacked with ${enemyAttack}: You win!!🎉`
    document.getElementById('messages').appendChild(paragraph)
}

function ramdom(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min)
}

window.addEventListener('load', startGame)