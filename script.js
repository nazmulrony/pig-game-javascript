'use strict';
//Selecting the elements
const player0Element = document.querySelector('.player--0')
const player1Element = document.querySelector('.player--1')
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.querySelector('#current--0')
const current1Element = document.querySelector('#current--1')
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');



//Starting conditions

let playing, score, currentScore, activePlayer;

const init = function(){
    playing = true;
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    current0Element.textContent = 0;
    current1Element.textContent = 0;
    diceElement.classList.add('hidden');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--active');

}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}
//Roll dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //Generating radndom dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        //Display dice
        diceElement.classList.remove('hidden')
        diceElement.src = `dice-${dice}.png`
        //Check for rollled 1: if true switch to next player
        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
})
//Score holding functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 20) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden')

        } else {
            switchPlayer();
        }
    }
})
//Starting a new game
btnNew.addEventListener('click', init);