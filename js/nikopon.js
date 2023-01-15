function startGame() {
    let petGamerButton = document.getElementById('pet-button')
    petGamerButton.addEventListener('click', selectPetGamer)
    
}

function selectPetGamer(){
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
        alert(`seleccionaste tu mascota ${selectedPet}`)
    }
    else {
        alert('No haz seleccionado tu mascota')
    }
}

window.addEventListener('load', startGame)