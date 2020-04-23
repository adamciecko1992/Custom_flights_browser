import { searchElements } from "./DOM.js"
import { elementCreation, appendChildren } from "./utilities";
const date = new Date()
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();


function monthCalc(month) {
    let day;
    switch (month) {
        case 0:
            {
                day = 'Jan';
                break;
            }
        case 1:
            {
                day = 'Feb';
                break;
            }
        case 2:
            {
                day = 'Mar';
                break;
            }
        case 3:
            {
                day = 'Apr';
                break;
            }
        case 4:
            {
                day = 'May';
                break;
            }
        case 5:
            {
                day = 'Jun';
                break;
            }
        case 6:
            {
                day = 'Jul';
                break;
            }
        case 7:
            {
                day = 'Aug';
                break;
            }
        case 8:
            {
                day = 'Sep';
                break;
            }
        case 9:
            {
                day = 'Oct';
                break;
            }
        case 10:
            {
                day = 'Nov';
                break;
            }
        case 11:
            {
                day = 'Dec';
                break;
            }

    }
    return day;
}

const monthWords = function() {
    const wordsArr = [];
    for (let i = 0; i <= 11; i++) {
        let monthWord = monthCalc(i);
        wordsArr.push(monthWord);

    }
    return wordsArr;
}
const daysCreation = () => {
    const days = [];
    for (let i = 1; i <= 31; i++) {


        const number = i;
        days.push(number);

    }
    return days;
}
const monthsArr = monthWords();
const days = daysCreation();


const optionsCreation = (parent, arr) => {
    for (let el of arr) {
        let option = elementCreation("option");
        option.value = el;
        option.textContent = el
        parent.appendChild(option);
    }
}

optionsCreation(searchElements.depDateMonth, monthsArr);
optionsCreation(searchElements.retDateMonth, monthsArr);
optionsCreation(searchElements.depDateDay, days)
optionsCreation(searchElements.retDateDay, days)