/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

const phraseTarget = document.querySelector("#phrase");
class Phrase{
    constructor(phrase){
        this.phrase = phrase;
        this.game = new Game()
    }
    
    /*----------------------
    * Add Phrase to display
    ----------------------*/
    addPhraseToDisplay(){
        let chosenPhrase = game.activePhrase
        console.log(`Your Phrase: ${chosenPhrase}`)
        let ulElement = game.createEle('ul', null, null);    
        for(let i = 0; i < chosenPhrase.length; i++){
            let character = chosenPhrase[i];
            let tempElement;
            if(character === " "){
                tempElement = game.createEle('li', character, ['space'])
            }
            else{
                tempElement = game.createEle('li', character, ['hide', 'letter', `${character}`] )
            }
            ulElement.appendChild(tempElement)
        }
        phraseTarget.firstElementChild.replaceWith(ulElement)
    }
    
    /*----------------------
    * Click on BUTTON Interactions
    ----------------------*/
    handleInteraction(letter){
        if(letter !== null || letter !== undefined){
            if(phrase.checkLetter(letter.innerHTML) == true){
                //Update Active Phrase
                console.log("letter", letter)
                letter.classList.add("chosen");
                letter.disabled = true
                this.showMatchedLetter(letter)
                game.checkForWin()
                
            }
            else{
                letter.classList.add(null, "wrong");
                letter.disabled = true
                this.updatePhrase(letter)
                game.misses++
                game.removeLife()
                game.checkForWin()
            }
        }   
    }

    /*--------------------------------------------------------
    * Update Active Phrase and remove each occurrence of letter
    --------------------------------------------------------*/
    updatePhrase(letter){
        //Match number of active letters in active phrase
        let tempPhrase = game.activePhrase;
        for (let i = 0; i < tempPhrase.length; i++) {
            if(tempPhrase[i] == letter.innerHTML){
                tempPhrase = this.remove_character(tempPhrase, i)
            }
        }
        game.activePhrase = tempPhrase;
        console.log(`Active Phrase: ${game.activePhrase}`)
    }
    
    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    * @return boolean - Determine if letter was found
    */
    checkLetter(letter) {
        let chosenPhrase = game.activePhrase
        let booleanReturn;
        let counter = 0;
        for(let i = 0; i < chosenPhrase.length; i++){
            let character = chosenPhrase[i];
            if(character == letter){
                counter++
            }
        }
        counter > 0 ? booleanReturn = true : booleanReturn = false;
        return booleanReturn
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        //console.log(game.activePhrase)
        let letterList = document.querySelectorAll('.letter')
        letterList.forEach(ele => {
            if(ele.innerHTML == letter.innerHTML){
                ele.classList.replace("hide", "show")
            }  
        })
        //console.log(letterList)
        console.log(`Letter: ${letter}`);
        this.updatePhrase(letter);
    }

    /**
    * Remove a character at a position
    * @param {string} str - Letter to display
    * @param {number} char_position - Letter to display
    */
    remove_character(str, char_pos) {
        let part1, part2;
        part1 = str.substring(0, char_pos);
        part2 = str.substring(char_pos + 1, str.length);
        return (part1 + part2);
    }
}