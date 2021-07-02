/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
let game = new Game();
var phrase = new Phrase();

//Click Start Game Button
document.getElementById('btn__reset').addEventListener('click', function(event){
    game = new Game();
    game.startGame()

});

let key = document.querySelectorAll('.key')

key.forEach(elemnt => elemnt.addEventListener('click', (event)=>{
    phrase.handleInteraction(event.target)
}))

document.addEventListener('keypress', (event)=>{
    console.log(event.key)
    if(document.querySelector("#overlay").style.display == "none"){
        if(isCharacterALetter(event.key)){
            for (let i = 0; i < key.length; i++) {
                if(event.key == key[i].innerHTML && key[i].disabled != true)
                phrase.handleInteraction(key[i])
            } 
        }   
    }
    // start or reset existing game
    if(event.key === "Enter"){
        if(game.inGameStatus == true){
            game.startGame()
        }
        else{
            game = new Game();
            game.startGame()
        }
        
    }
})

function isCharacterALetter(keyTarget) {
    return keyTarget.toLowerCase() != keyTarget.toUpperCase()
}