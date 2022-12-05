
let game = new Game();
var phrase = new Phrase();

//Click Start Game Button
document.getElementById('btn__reset').addEventListener('click', function(event){
    game = new Game();
    game.startGame()

});
//Target all key class Elements on gameboard
let key = document.querySelectorAll('.key')

//Listener: Click onScreen keyboard
key.forEach(elemnt => elemnt.addEventListener('click', (event)=>{
    phrase.handleInteraction(event.target)
}))
//Listener: Press keyboard to update game or Press enter to start/reset Game
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