let allFlights = [];


searchElements.searchButton.addEventListener("click", async(e) => {
    e.preventDefault();
    await fetchData("data/flights.json").then((flights) => {
        for (let flight of flights.flights) {
            allFlights.push(flight);
        }
    });

    const formData = {
        flights: allFlights,
        depDateDay: searchElements.depDateDay.value,
        depDateMonth: searchElements.depDateMonth.value,
        depDateYear: searchElements.depDateYear.value,
        departure: searchElements.departurePort.value,
        arrival: searchElements.arrivalPort.value,
        oneway: searchElements.oneway.checked,
        twoways: searchElements.twoWays.checked,
        person: searchElements.personCount.value,
        retDate: searchElements.retDateDay.value,
    }
    elements.renderRoot.classList.toggle("hidden");
    elements.renderRoot.innerHTML = "";
    elements.wrapper.style.filter = "blur(4px)";
    const flightsWindow = new BrowserWindow(formData);
    flightsWindow.renderToTarget(elements.renderRoot);

})