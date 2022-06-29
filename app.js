const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const phraseUL = document.querySelector('#phrase ul');
const keyboard = document.querySelector('#qwerty');
const heartList = document.querySelector('#scoreboard ol');
const heartArray = document.querySelectorAll('.tries img');
const heart = document.querySelector('.tries img');

let missed = 0;
let phrases = ['hyper text markup language',
			   'cascading style sheets',
			   'javascript',
			   'github',
			   'sass',
			   'terminal'];

startButton.addEventListener('click', () => {
	if (startButton.textContent === 'Start Game') {
		const phraseArray = getRandomPhraseAsArray(phrases);
	    startGame()
		overlay.style.display = 'none';	
	} else {
		resetGame();
		startGame();
		overlay.style.display = 'none';
	}
});

const getRandomPhraseAsArray = arr => {    // phraseList
    const random = Math.floor(Math.random() * arr.length)
    const randomPhrase = arr[random]
    const characters = randomPhrase.split('')
    return characters
}

const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li')
        li.textContent = arr[i]
        phraseUL.append(li)
        const letters = /^[0-9a-zA-Z]+$/;
		if (li.textContent.match(letters)) {
			li.className = 'letter';
		} else {
			li.className = '';
			li.style.margin = '1em';
		}
    }
}

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		button.className = 'chosen';
		button.setAttribute('disabled', '');
		const letter = button.textContent;
		const letterFound = checkLetter(letter);


        if (letterFound === null) {
            heartArray[missed].src = 'images/lostHeart.png'
            button.className = 'wrong'
            missed++
        }
    }
     checkWin()
})

const checkLetter = letter => {
    const letters = document.querySelectorAll('.letter')
    let matchingLetter
    let matchCounter = 0

    for (i = 0; i < letters.length; i++) {
        if (letter === letters[i].textContent) {
            letters[i].className += ' show'
            matchingLetter = letter
            matchCounter++
        }
    }
    if (matchCounter > 0) {
        return matchingLetter
    } else {
        return null
    }
}

const checkWin = () => {
    const totalLetters = document.querySelectorAll('.letter')
    const shownLetters = document.querySelectorAll('.show')
    const h3 = document.createElement('h3')

    if (shownLetters.length === totalLetters.length) {
        removeShowClass()
        overlay.className = 'win'
        overlay.style.display = 'flex'
        startButton.textContent = 'Play Again'
        overlay.appendChild(h3)
        h3.textContent = 'You Won!'
        // showCorrectPhrase()
    } else if (missed >= 5) {
        removeShowClass()
        overlay.className = 'lose'
        overlay.style.display = 'flex'
        startButton.textContent = 'Try Again'
        overlay.appendChild(h3)
        h3.textContent = 'You Lost!'
        showCorrectPhrase()
    }
}

function removeShowClass() {
    for (i = 0; i < phraseUL.children.length; i++) {
        phraseUL.children[i].classList.remove('show')
    }
}

function showCorrectPhrase() {
    const h4 = document.createElement('h4')
    h4.textContent = 'the correct phrase was: ' + phraseUL.textContent.toUpperCase()
    overlay.appendChild(h4)
}

function startGame() {
    const phraseArray = getRandomPhraseAsArray(phrases)
    addPhraseToDisplay(phraseArray)
}

function resetGame() {
    missed = 0

    while (phraseUL.firstChild) {
        phraseUL.removeChild(phraseUL.firstChild)
    }

    //rmv congrat
    const h3 = document.querySelector('h3')
    h3.parentNode.removeChild(h3)

    //reset hearts
    for (let i = 0; i < heartArray.length; i++) {
        heartArray[i].src = 'images/liveHeart.png'
    }

    //reset keyboard
    const keyboardButton = document.querySelectorAll('#qwerty button')
    for (let i = 0; i < keyboardButton.length; i++) {
        keyboardButton[i].classList.remove('chosen')
        keyboardButton[i].classList.remove('wrong');
		keyboardButton[i].removeAttribute('disabled');
    }
}
