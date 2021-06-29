/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
const phrase = new Phrase();

//Click Start Game Button
document.getElementById('btn__reset').addEventListener('click', function(event){
    game.startGame()
    phrase.addPhraseToDisplay()
    event.target.parentNode.style.display = 'none';
});

let key = document.querySelectorAll('.key')

key.forEach(elemnt => elemnt.addEventListener('click', (event)=>{
    let selectedLetter = event.target.innerHTML;
    if(phrase.checkLetter(selectedLetter) == true){
        event.target.classList.add("chosen");
        event.target.disabled = true
        phrase.handleInteraction(selectedLetter)
    }
    else{
        event.target.classList.add("wrong");
        event.target.disabled = true
        game.missed();
    }
}))

