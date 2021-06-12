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
        
    }

    /**
     * Get Random Phrase
     * Add Random Phrase to the Gameboard
     * @param resetStatus (boolean) call reset Method: ignore
     */
    startGame(){
        let randomPhrase = game.getRandomPhrase();
        this.addPhraseToGameBoard(randomPhrase)
        if(this.resetStatus === true){
            this.reset(this.configNumberOfLifes);
        }
    }
    /* Missed Method - Button click was incorrect */
    missed(){
        this.misses++
        console.log(`You missed: i:${this.misses}`)
        this.removeLife()
        this.checkForWin()
    }

    /**
     * Choose a phrase at random and convert string to lower case
     * @returns {string} Selected from phrase 
     */
    phrases(){
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
        else if(document.querySelectorAll('.hide').length === 0 && this.life > 0){
            this.gameOver(true);
        }
    };

    /* Reset the game board */
    reset(){
        this.resetStatus = false;
        this.deleteChild("ul")

        // Configure Main Menu Display
        phrase.addPhraseToDisplay()
        overlayTarget.style.display = "none";

        // Reset buttons
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

    /*
    * Removes a life from the scoreboard*/
    removeLife() {
        document.querySelector("#scoreboard").firstElementChild.children
        if(this.life != 0 ){
            this.life--
        }
        console.log(`Life: ${this.life}`)
        let scoreboardCollection = document.querySelector("#scoreboard").firstElementChild
        scoreboardCollection.lastElementChild.remove()
    }
    /*
    * Add a life to the scoreboard */
    addLife(numberOfLifes){
        let targetScoreBoard = document.querySelector("#scoreboard").firstElementChild;
        for (let i = 0; i < numberOfLifes; i++) {
            targetScoreBoard.append(this.htmlToElements('<li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>')[0]);
        }
    }

    /*
    * Displays game over message
    * GameWon - Whether or not the user won the game
    */
    gameOver(gameWon) {
        this.resetStatus = true;
        function updateOverlay(message, addClass){
            document.querySelector('#overlay').className = addClass;
            document.querySelector('#game-over-message').innerHTML = message; 
            document.querySelector('#overlay').style.display = "inherit";
        }
        if(gameWon === true){
            updateOverlay('YOU WON!', 'win');
        }
        else{
            updateOverlay('Sorry, you lose!', 'lose');
        }
    };
    /*Set phrase value to class Object*/
    addPhraseToGameBoard(selectedPhrase){
        this.activePhrase = selectedPhrase;
    }
    /*Console Log current Phrase*/
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

    /**
     * @param {Object} target representing any number of sibling elements
     */
    deleteChild(target) {
        var e = document.querySelector(target);
        
        //e.firstElementChild can be used.
        var child = e.lastElementChild; 
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }

    /**
     * @param {String} HTML_TYPE representing any number of sibling elements
     * @param {String} content representing any number of sibling elements
     * @param {String} styleClass representing any number of sibling elements
     * @return {Object} HTML Object
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

