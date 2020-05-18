import template from "./summaryWindow.html";
import { PersonCard } from "./personCard/personCard";

class SummaryWindow_model {
  constructor(finalData) {
    this.allForms = finalData[0];
    this.formsModels = [];
    this.flightData = finalData[1];
    console.log(this.flightData);
    this.airfaresPrice = this.getAirfarePrice(
      this.flightData.airfareSelections
    )
    console.log("SummaryWindow_model -> constructor -> this.airfaresPrice", this.airfaresPrice)
    
  }
  sortFormsData(formsObjArr) {
    for (let form of formsObjArr) {
      const model = form.controller.model;
      this.formsModels.push(model);
    }
  }
  getAirfarePrice(selectionsArr) {
  
      
    let sum = null;
    for (let selection of selectionsArr) {
      switch (selection.airfare) {
        case "economic":
          sum += parseInt(this.flightData.price.economic);
          break;
        case "buisness":
          sum += parseInt(this.flightData.price.buisness);
          break;
        case "premium":
          sum += parseInt(this.flightData.price.premium);
      }
    }
    return sum;
  }
}

class SummaryWindow_controller {
  constructor(model, view, root_element) {
    this.model = model;
    this.view = view;
    this.model.sortFormsData(this.model.allForms);
    this.view.renderPersonsData(this.model.formsModels);
    this.view.appendMarkup(root_element);
  }
}

class SummaryWindow_view {
  constructor() {
    this.markup = document.createRange().createContextualFragment(template);
    this.box = this.markup.querySelector("#summaryWindow");
    this.personsRoot = this.markup.querySelector("#personsRoot");
  }
  renderPersonsData(arrOfModels) {
    for (let model of arrOfModels) {
      const personCard = new PersonCard(this.personsRoot, model);
    }
  }
  hide() {
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

export class SummaryWindow {
  constructor(root_element, finalData) {
    this.controller = new SummaryWindow_controller(
      new SummaryWindow_model(finalData),
      new SummaryWindow_view(),
      root_element
    );
  }
}
