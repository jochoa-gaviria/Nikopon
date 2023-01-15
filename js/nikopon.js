function startGame() {
    let petPlayerButton = document.getElementById('pet-button')
    petPlayerButton.addEventListener('click', selectPetPlayer)
    
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
    let pet = ramdomPet(1,3)
    if (pet == 1){
        return "hipodoge"
    }
    if (pet == 2){
        return "cepipepo"
    } 
    if (pet == 3) {
        return "ratigueya"
    }
}

function ramdomPet(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min)
}

window.addEventListener('load', startGame)