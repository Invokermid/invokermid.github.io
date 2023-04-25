import { startGame } from "./startGame.js";



export const createGameMenu = (flag) => {
    const btnPrev = document.querySelector('.header_btn-prev');
    btnPrev.style.display = "none";

    const score = document.querySelector('.score');
    let s1 = Number(score.textContent);

    score.style.display = "none";

    const bestScore = document.querySelector('.best_score');
    if (bestScore.textContent == "") {
        bestScore.style.visibility = "hidden";
        bestScore.textContent = "РЕКОРД: 10000";
        console.log("status 2 hidden")
    }
    else {
        if (Number(bestScore.textContent.slice(8, bestScore.textContent.length)) > s1 && flag) {
            console.log("status 2 visible")
            bestScore.textContent = `РЕКОРД: ${s1}`;
            bestScore.style.visibility = "visible";
        }
    }





    const title = document.createElement('h2');
    title.classList.add('game-menu_title');
    const gameSection = document.querySelector('.game-section_container');
    gameSection.innerHTML = "";

    title.textContent = "жестокость игры";
    const createMenuButton = (lvl) => {
        const button = document.createElement('button');
        button.classList.add('game-menu__btn');
        if (lvl == 1) lvl = 'нуб';
        else if (lvl == 2) lvl = 'пойдет';
        else if (lvl == 3) lvl = 'сложно';
        button.textContent = lvl;
        button.addEventListener('click', () => startGame(lvl));
        return button;


    }

    gameSection.append(
        title,
        createMenuButton(1),
        createMenuButton(2),
        createMenuButton(3),
    );
}