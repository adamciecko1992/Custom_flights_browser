import template from "./luggageWindow.html";
import { elementCreation } from "../../../services/elementCreation/elementCreation";
import { appendChildren } from "../../../services/appendChildren/appendChildren";

class LuggageWindow_model {
  constructor(flightData) {
    this.flightData = flightData;
    this.flightData.luggageSelections = [];
    this.flightData.airfareSelections = [];
    this.persons = flightData.persons;
    this.luggageTypes = ["small", "medium", "big"];
    this.airfareTypes = ["economic", "buisnes", "premium"];
  }
}

class LuggageWindow_controller {
  constructor(model, view, root_element) {
    this.parent = root_element;
    this.model = model;
    this.view = view;

    this.handleReservationBtn = () => {
      this.collectLuggageAndAirfare();
      eventBus.dispatchEvent("reservationBtn_clicked", this.model.flightData);
    };
    this.view.createChoiceBoxes(
      this.view.airfareOptionsRoot,
      this.model.persons,
      this.model.airfareTypes
    );
    this.view.createChoiceBoxes(
      this.view.luggageOptionsRoot,
      this.model.persons,
      this.model.luggageTypes
    );
    this.view.fillAirfaresPrices(this.model.flightData.price);

    this.view.bind_reservationButtonClicked(this.handleReservationBtn);
    this.view.appendMarkup(root_element);
  }
  collectLuggageAndAirfare() {
    this.view.luggageSelections.forEach((luggageSelection) => {
      this.model.flightData.luggageSelections.push({
        person: luggageSelection.person.innerText,
        luggage: luggageSelection.luggage.value,
      });
    });
    this.view.airfareSelections.forEach((airfareSelection) => {
      this.model.flightData.airfareSelections.push({
        person: airfareSelection.person.innerText,
        airfare: airfareSelection.airfare.value,
      });
    });
  }
}

class LuggageWindow_view {
  constructor() {
    this.markup = document.createRange().createContextualFragment(template);
    this.box = this.markup.querySelector("#luggageWindow");
    this.seatsReservationButton = this.markup.querySelector(
      "#seatsReservationButton"
    );
    this.luggageOptionsRoot = this.markup.querySelector("#personsLuggageRoot");
    this.airfareOptionsRoot = this.markup.querySelector("#personsAirfareRoot");
    this.economicPrice = this.markup.querySelector("#economicPrice");
    this.buisnessPrice = this.markup.querySelector("#buisnessPrice");
    this.premiumPrice = this.markup.querySelector("#premiumPrice");
    this.luggageSelections = [];
    this.airfareSelections = [];
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

  bind_reservationButtonClicked(handler) {
    this.seatsReservationButton.addEventListener("click", () => {
      handler();
    });
  }
  fillAirfaresPrices(priceObj) {
    this.economicPrice.innerHTML = priceObj.economic;
    this.buisnessPrice.innerHTML = priceObj.buisness;
    this.premiumPrice.innerHTML = priceObj.premium;
  }

  createChoiceBoxes(parent, num, optionsArr) {
    for (let i = 1; i <= num; i++) {
      const optionBox = elementCreation("div");
      const optionSelect = elementCreation("select");
      optionSelect.id = `Person ${i}`;
      for (let i = 0; i < optionsArr.length; i++) {
        const option = elementCreation("option", "text");
        option.innerText = optionsArr[i];
        option.value = optionsArr[i];
        optionSelect.appendChild(option);
      }
      const label = elementCreation("span", "text", "label");
      label.innerText = `Person ${i}`;
      appendChildren(optionBox, label, optionSelect);
      parent.appendChild(optionBox);
      if (optionsArr.indexOf("small") !== -1) {
        this.luggageSelections.push({
          person: label,
          luggage: optionSelect,
        });
      } else {
        this.airfareSelections.push({
          person: label,
          airfare: optionSelect,
        });
      }
    }
  }
}

export class LuggageWindow {
  constructor(root_element, flightData) {
    this.controller = new LuggageWindow_controller(
      new LuggageWindow_model(flightData),
      new LuggageWindow_view(),
      root_element
    );
  }
}
