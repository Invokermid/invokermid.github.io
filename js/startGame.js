import { createGameCard } from "./gameCard.js";
import { createCardsArray, dublicateArray, shuffle } from "./utils.js";

import { createGameMenu } from "./gameMenu.js"

function gameWin(card) {
    for (const el of card) {
        if (!el.classList.contains('successfully')) {
            return false;
        }
    }
    return true;
}


export const startGame = (lvl) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;
    let counter = 0;

    const score = document.querySelector('.score');
    score.style.display = "block";
    score.textContent = counter;



    const gameSection = document.querySelector('.game-section_container');
    gameSection.innerHTML = "";
    const gameField = document.createElement('div');
    const cardsArray = createCardsArray(lvl);
    const dubcardsArray = dublicateArray(cardsArray);

    const shuffleCardsArray = shuffle(dubcardsArray);

    gameField.classList.add('game-field');
    shuffleCardsArray.forEach(card => {
        gameField.append(createGameCard('X', card));

    });



    gameSection.append(gameField);
    console.log(shuffleCardsArray);

    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            counter++;
            score.textContent = counter;
            if (clickable == true && !card.classList.contains('successfully')) {
                card.classList.add('flip');
                const t = card.getElementsByTagName('i')[1].className;
                card.classList.add(t)
                if (firstCard == null) {
                    firstCard = index;
                }
                else {
                    if (index != firstCard) {
                        secondCard = index;
                        clickable = false;
                    }
                }

                if (firstCard != null && secondCard != null && firstCard != secondCard) {
                    if (cards[firstCard].lastElementChild.className ===
                        cards[secondCard].lastElementChild.className) {
                        setTimeout(() => {
                            cards[firstCard].classList.add('successfully');
                            cards[secondCard].classList.add('successfully');
                            firstCard = null;
                            secondCard = null;
                            clickable = true;

                            if (gameWin(cards)) {
                                setTimeout(() => {
                                    console.log("YOU WIN!!!");
                                    createGameMenu(true);
                                }, 1000);
                            }


                        }, 500);
                    }
                    else {
                        setTimeout(() => {
                            let f1 = cards[firstCard].lastElementChild.className
                            let f2 = cards[secondCard].lastElementChild.className
                            cards[firstCard].classList.remove('flip');
                            cards[secondCard].classList.remove('firstCard');
                            cards[firstCard].classList.remove(f1);
                            cards[secondCard].classList.remove(f2);
                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                        }, 500);
                    }
                }
            }
        });
    });
    const btnPrev = document.querySelector('.header_btn-prev');
    btnPrev.style.display = "flex";
    btnPrev.addEventListener('click', () => {
        createGameMenu(false);
    })

}

