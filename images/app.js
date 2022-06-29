/*
VARIABLES
*/
// selecting elements by ID.
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const winText = document.querySelector('.title');
const ul = document.querySelector('ul');
const letter = document.getElementsByClassName('letter');

// setting the score.
const missed = 0;
// array
const phrases = [
    'hyper text markup language',
    'cascading style sheets',
    'javascript',
    'sass',
    'github'
]

// making event listener
startButton.addEventListener('click',(e) => {
    e.preventDefault();
    overlay.style.display = 'none';
  });

// picks a random string.
function getRandomPhraseAsArray(arr) {
    const randomPhrase = Math.floor(Math.random() * phrases.length);
    let Phrase = arr[randomPhrase];
    console.log(Phrase);
    return Phrase;
  }
// placing the phrases inside the functions and storing inside a variable.
const randomPhrase = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    for ( let i = 0; i < arr.length; i++) {
        let letter = arr[i];
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.textContent = letter; // displaying string letter
        ul.appendChild(li); // adding li to ul as child

        if (letter === '') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}
// adding the get random phrase as array function to the display funtion.
addPhraseToDisplay(randomPhrase);

let clickedLetter = document.querySelectorAll('.letter');
function checkLetter(arr) {
    let match = null;

    for (let i = 0; i < clickedLetter.length; i += 1) {
        const li = clickedLetter[i];
        if (letter[i].textContent === arr.textContent){
          letter[i].classList.add('show');
  
          match = arr.textContent;
        }
      }
      return match;
    }
    qwerty.addEventListener('click', (e) => {
        let btn = e.target;
        if (btn.tagName === 'BUTTON') {
            btn.className = 'chosen';
            btn.disabled = 'true';
            
            let letterFound = checkLetter(btn);
            if ( letterFound === null) {
                let tries = document.querySelectorAll('.tries img')[missed];
                tries.src = "images/lostHeart.png";
                missed += 1;
            }
        };
        
        checkWin();
});

function checkWin() {
    const liLetter = document.getElementsByClassName('letter');
    const liShow = document.getElementsByClassName('show');
    if ( liLetter.length === liShow.length) {
        overlay.className = 'win';
        overlay.children[0].textContent = 'U win';
        startButton.textContent = "Let's play again?";
        overlay.style.display = 'flex';
        reset()
    } else if (missed >= 5 ) {
        overlay.className = 'lose';
        overlay.children[0].textContent = 'You Lose!';  
        startButton.textContent = "Let's play again?";     
        overlay.style.display = 'flex';
        reset()
    };
   
};
function reset () {
    
    const li = document.querySelectorAll('ul');
    
    missed = 0;
    li.innerHTML = "";
    
    
    for (let i = 0; i < button.length; i++) {
        button[i].className = "";
        button[i].disabled = false;
    }
    for (let i = 0; i < li.length; i++ ) {
            li[i].className = "";
            li[i].textContent = "";
    }
    let tries = document.querySelectorAll('li.tries');
    for (let i = 0; i < tries.length; i++) {
        
        tries[i].firstElementChild.src = "images/liveHeart.png";
    }
    const newRandomPhrase = getRandomPhraseAsArray();
     addPhraseToDisplay(newRandomPhrase);
    
};


