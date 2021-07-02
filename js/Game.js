/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/*-----------------------------------------------------------------------------
○ missed: Used to track the number of missed guesses by the player. The initial
value is `0`, since no guesses have been made at the start of the game.

○ phrases: An array of Phrase objects to use with the game. For now, initialize the
property to an empty array. In the next step you'll work on initializing this
property with an array of Phrase objects.

○ activePhrase: This is the Phrase object that’s currently in play. The initial value is
`null`.
-----------------------------------------------------------------------------*/ 

const overlayTarget = document.querySelector("#overlay")
class Game{
    constructor(){
        this.activePhrase = null;
        this.misses = 0;
        this.life = 5;
        this.resetStatus = false;
        this.inGameStatus = false;
    }

    /**
     * Get Random Phrase and Add Random Phrase to the GameBoard
     * Reset and Display GameBoard
     */
    startGame(){
        console.log("GAME STARTED")
        this.inGameStatus = true;
        let randomPhrase = this.getRandomPhrase();
        this.addPhraseToGameBoard(randomPhrase)
        this.reset()
        
        phrase.addPhraseToDisplay()
        document.getElementById('btn__reset').parentNode.style.display = 'none';
    }

    //Missed Method - Button click was incorrect
    missed(){
        console.log(`You missed: i:${this.misses}`)
    }

    /**
     * Choose a phrase at random and convert string to lower case
     * @returns {string} Selected from phrase 
     */
    phrases(){
        /* Short Phrase Array
        let phraseArray = [ "chocolates", "eyes", "famous", "Fart", "vacation"];
        */
        // Long Phrase Array
        let phraseArray = [ "Life is like a box of chocolates", "Sometimes when I close my eyes I cant see", "Dont be stupid it might you famous", "Fart when someone hugs you it makes them feel strong", "I love my job only when im on vacation"];
        let lowerCaseArray = phraseArray.map(phrase => phrase.toLowerCase() )
        return lowerCaseArray;
    }

    /**
    * Selects random phrase from phrases array
    * @return {array} Phrase array[index] chosen to be used
    */
    getRandomPhrase() {
        let phraseArray = this.phrases()
        return phraseArray[Math.floor(Math.random() * phraseArray.length)]
        
    };

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    */
    checkForWin() {
        if(this.life == 0 && this.misses == 5){
            this.gameOver(false)
        }
        //check to see if all letters have been revealed && and if life has reached zero
        else if(document.querySelectorAll('.hide').length === 0 && this.life > 0){
            this.gameOver(true);
        }
    };

    /* Reset the game board */
    reset(){
        this.resetStatus = false;
        this.deletePhraseChild()
        document.querySelectorAll('.key').forEach(element => {
            element.className = "key"
            element.disabled = false
        })
        this.misses = 0;
        let oldLife = this.life;
        if(oldLife > 0){
            this.addLife(5 - oldLife);
        } else{
            this.addLife(5);
        }
        this.life = 5;
    };

    /* Removes a life from the scoreboard*/
    removeLife() {
        document.querySelector("#scoreboard").firstElementChild.children
        if(this.life != 0 ){
            this.life--
        }
        console.log(`Life: ${this.life}`)
        let scoreboardCollection = document.querySelector("#scoreboard").firstElementChild
        scoreboardCollection.lastElementChild.remove()
    }
    /** 
     * Add a life to the scoreboard 
     * @param {numberOfLifes} number numebr of lives 
     * */
    addLife(numberOfLifes){
        let targetScoreBoard = document.querySelector("#scoreboard").firstElementChild;
        for (let i = 0; i < numberOfLifes; i++) {
            targetScoreBoard.append(this.htmlToElements('<li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>')[0]);
        }
    }

    /** 
    * Displays game over messageWhether or not the user won the game
    * @param {GameWon} value "True" you WON! : "False" you LOOSE!
    */
    gameOver(gameWon) {
        this.resetStatus = true;
        this.inGameStatus = false;
        function updateOverlay(message, addClass, enterMessage){
            document.querySelector('#overlay').className = addClass;
            document.querySelector('#game-over-message').innerHTML = message; 
            document.querySelector('#game-enter-message').innerHTML = enterMessage; 
            document.querySelector('#overlay').style.display = "inherit";
        }
        if(gameWon === true){
            updateOverlay('YOU WON!', 'win', 'Press "Enter" to Start Game');
            this.reset();
        }
        else{
            updateOverlay('Sorry, you lose!', 'lose', 'Press "Enter" to Try Again');
            this.reset();
        }
        
    };
    //Set phrase value to class Object
    addPhraseToGameBoard(selectedPhrase){
        this.activePhrase = selectedPhrase;
    }
    
    //Console Log Active Phrase
    activePhrase(){
        console.log(`Active Phrase: ${this.activePhrase}`)
    }
    
    /**
     * @param {String} HTML representing any number of sibling elements
     * @return {NodeList} 
     */
    htmlToElements(html) {
        let template = document.createElement('template');
        template.innerHTML = html;
        return template.content.childNodes;
    }

    //Delete Child Elements
    deletePhraseChild() {
        document.querySelector("#phrase").childNodes[1].remove();
        document.querySelector("#phrase").appendChild(document.createElement("ul"));
    }

    /**
     * @param {String} HTML_TYPE string HTML Type ex. 'div'
     * @param {String} content innerHTML Contents, must be string ex. 'hello'
     * @param {array} styleClass Array of styles ex. ['style1', 'style2']
     * @return {Object} HTML Object Element
     */
    createEle(HTML_TYPE, content, styleClass) {
        let newObject = document.createElement(HTML_TYPE);
        if (
            content != null &&
            content !== undefined &&
            (typeof content === 'string' || typeof content === 'number')
        ) {
            newObject.innerHTML = content;
        }
        if (styleClass != null && styleClass !== undefined) {
            for(let i = 0; i < styleClass.length; i++){
                newObject.classList.add(`${styleClass[i]}`);     
            }
        }
        return newObject;
    }
}

