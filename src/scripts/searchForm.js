import { fetchData } from "./utilities"
import { elements, searchElements } from "./DOM";

searchElements.searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const choosedArrival = searchElements.arrivalPort.value;
    const choosedDate = searchElements.departureDate.value;


})




function fetchFlights() {
    fetchData("data/flights.json").then((data) => {

    })
}

// fetchFlights();