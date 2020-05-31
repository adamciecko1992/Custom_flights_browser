import {
    bombardier_Svg,
    boeing_747_Svg,
    boeing_737_Svg,
} from "./assets/aircraftSvg";
import template from "./seatsReservationWindow.html";
import { Popup } from "../../popup/popup";

class SeatsReservation_model {
    constructor(flightData) {
        this.flightData = flightData;
        this.svg = this.getMatchedImg(flightData.aircraft);
        this.seatsRows = {};
        this.chosenSeats = [];
    }
    getMatchedImg(aircraft) {
        let svgPlane;
        switch (aircraft) {
            case "Bombardier":
                svgPlane = bombardier_Svg;
                break;
            case "Boeing_737":
                svgPlane = boeing_737_Svg;
                break;
            case "Boeing_747":
                svgPlane = boeing_747_Svg;
        }
        return svgPlane;
    }
    sortSeatsByRow(seats) {
        let seatsArr = [...seats];
        seatsArr.forEach((seat, index, arr) => {
            const svgNum = seat.attributes[0].value.slice(1, 4);
            if (!this.seatsRows[svgNum]) {
                this.seatsRows[svgNum] = [];
                this.seatsRows[svgNum].push(seat);
                const seatNum = arr.indexOf(seat);
                arr.splice(seatNum, 1);
            } else {
                this.seatsRows[svgNum].push(seat);
                const seatNum = arr.indexOf(seat);
                arr.splice(seatNum, 1);
            }
        });
        if (seatsArr.length > 0) {
            this.sortSeatsByRow(seatsArr);
        }
    }
    sortSeatsInRow(seatsRows) {
        const rows = Object.values(this.seatsRows);

        function getH(seat) {
            return seat.indexOf("H");
        }
        for (let row of rows) {
            row.sort(
                (a, b) => {
                    return parseInt(
                            a.attributes[0].value.slice(4, getH(a.attributes[0].value))
                        ) -
                        parseInt(b.attributes[0].value.slice(4, getH(b.attributes[0].value)))
                });

        }
    }
    addNumberToSeats() {
        const seats = Object.values(this.seatsRows);
        const rows = Object.keys(this.seatsRows);

        if (this.flightData.aircraft === "Boeing_737") {
            const lastRows = seats.splice(0, 13);
            seats.push(...lastRows);
        }
        if (this.flightData.aircraft === "Boeing_747") {
            const lastRows = seats.splice(0, 32);
            seats.push(...lastRows);
        }
        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < seats[i].length; j++) {
                seats[i][j].id = `Row_${i + 1}_Number_${j + 1}`;
            }
        }
    }
}

class SeatsReservation_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.showPlane(this.model.svg);
        this.view.getSeatsList(this.model.flightData.aircraft);
        this.model.sortSeatsByRow(this.view.seats);
        this.model.sortSeatsInRow(this.model.seatsRows);
        this.model.addNumberToSeats();
        this.view.bind_seatClick(
            this.handleSeatClick.bind(this),
            this.handleSeatRemove.bind(this),
            this.model.flightData.persons
        );
        this.view.bind_confirmClick(this.handleConfirmClick.bind(this));
        this.view.appendMarkup(root_element);
    }
    handleSeatClick(clickedSeatNumber, currentPerson) {
        this.model.chosenSeats.push({
            Person: `${currentPerson}`,
            seat: `${clickedSeatNumber}`,
        });
        console.log(clickedSeatNumber);
        this.view.currentPerson.style.color = "black";

    }
    handleSeatRemove(removedSeatNumber, currentPerson) {
        const seatIndex = this.model.chosenSeats.indexOf({
            Preson: `${currentPerson}`,
            seat: `${removedSeatNumber}`,
        });
        this.model.chosenSeats.splice(seatIndex, 1);
    }
    handleConfirmClick() {
        if (
            this.model.chosenSeats.length === parseInt(this.model.flightData.persons)
        ) {
            this.model.flightData.chosenSeats = this.model.chosenSeats;
            window.eventBus.dispatchEvent("seats_chosen", this.model.flightData);
        } else {
            // new Popup(`Not all passangers had chosen their seats`);
            this.view.currentPerson.innerHTML =
                "Not all passangers have chosen their seats";
            this.view.currentPerson.style.color = "red";
        }
    }
}

class SeatsReservation_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#seatsReservationWindow");
        this.svgRoot = this.markup.querySelector("#svgRoot");
        this.currentPerson = this.markup.querySelector("#currentPerson");
        this.confirmSeatsBtn = this.markup.querySelector("#confirmSeatsBtn");
        this.currentPerson.innerHTML = "Person 1";
        this.seats = [];
    }
    showPlane(plane) {
        this.svgRoot.innerHTML = plane;
    }
    getSeatsList(aircraftSvg) {
        const paths = this.markup.querySelectorAll("path");
        const pathsArr = [...paths];
        switch (aircraftSvg) {
            case "Bombardier":
                pathsArr.shift();
                pathsArr.splice(60, 5);
                pathsArr.pop();
                this.seats = pathsArr;
                break;
            case "Boeing_737":
                pathsArr.splice(0, 4);
                pathsArr.splice(186, 2);
                pathsArr.pop();
                this.seats = pathsArr;
                break;
            case "Boeing_747":
                pathsArr.splice(0, 4);
                pathsArr.splice(279, 2);
                pathsArr.splice(-3, 3);

                this.seats = pathsArr;
                break;
        }
    }
    bind_seatClick(handleChoose, handleRemove, personCount) {
        let availableSeats = personCount;
        let currentPerson = 1;
        for (let seat of this.seats) {
            seat.addEventListener("click", (event) => {
                if (event.target.classList.contains("active")) {
                    event.target.classList.remove("active");
                    availableSeats++;
                    currentPerson--;
                    this.currentPerson.innerHTML = `Person ${currentPerson}`;
                    handleRemove(event.target.id, currentPerson + 1);
                } else {
                    if (availableSeats > 0) {
                        seat.classList.toggle("active");
                        availableSeats--;
                        currentPerson++;
                        this.currentPerson.innerHTML = `Person ${currentPerson}`;
                        if (availableSeats === 0) {
                            this.currentPerson.innerHTML = `Completed`;
                        }
                        handleChoose(event.target.id, currentPerson - 1);
                    } else {
                        alert("No more seats");
                    }
                }
            });
        }
    }

    bind_confirmClick(handler) {
        this.confirmSeatsBtn.addEventListener("click", () => {
            handler();
        });
    }
    hide() {
        this.box.classList.remove("slideInRight", "delay-1s");
        this.box.classList.add("animated", "slideOutLeft");
        setTimeout(() => {
            this.box.style.display = "none";
        }, 1000);
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.box);
        this.box.classList.add("animated", "slideInRight", "delay-1s");
    }
}

export class SeatsReservation {
    constructor(root_element, flightData) {
        this.controller = new SeatsReservation_controller(
            new SeatsReservation_model(flightData),
            new SeatsReservation_view(),
            root_element
        );
    }
}