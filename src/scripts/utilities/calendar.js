import { elementCreation, appendChildren } from "./utilities"

class Calendar {
    constructor() {
        this.day = this.getDay()
        this.month = this.getMonth()
        this.year = this.getyear()
    }
    getDay() {
        console.log('day');
    }
    getMonth() {
        console.log('month');
    }
    getYear() {
        console.log('year');
    }
    createDaysGrid(month) {
        if (month === 'Jan' || "Mar" || "May" || "Jul" || "Aug" || "Oct" || "Dec") {
            console.log(month);
        } else if (month === "Sept" || "Apr" || "Jun" || "Nov") {
            console.log(month);
        } else {
            console.log(month);
        }

    }

}