import template from "./personCard.html";

class PersonCard_model {
  constructor(personsObj) {
    this.personData = personsObj;
  }
}

class PersonCard_controller {
  constructor(model, view, root_element) {
    this.model = model;
    this.view = view;
    this.view.populateMarkupWithData(this.model.personData);
    this.view.appendMarkup(root_element);
  }
}

class PersonCard_view {
  constructor() {
    this.markup = document.createRange().createContextualFragment(template);
    this.box = this.markup.querySelector(".card");
    this.personNumber = this.markup.querySelector("#numberRoot");
    this.name = this.markup.querySelector("#nameRoot");
    this.surname = this.markup.querySelector("#surnameRoot");
    this.adress = this.markup.querySelector("#adressRoot");
    this.idNumber = this.markup.querySelector("#idNumRoot");
    this.seat = this.markup.querySelector("#seatRoot");
    this.luggage = this.markup.querySelector("#luggageRoot");
    this.airfare = this.markup.querySelector("#airfareRoot");
  }

  populateMarkupWithData(personData) {
    const {
      personNumber,
      name,
      surname,
      adress,
      idNumber,
      seat,
      luggage,
      airfare,
    } = this;
    personNumber.innerText = `${personData.personNum}`;
    name.innerText = `Name: ${personData.name}`;
    surname.innerText = `Surname: ${personData.surname}`;

    adress.innerText = `Adress: ${personData.adress}`;
    idNumber.innerText = `Id number: ${personData.idNumber}`;
    seat.innerText = `Seat: ${personData.seat}`;
    airfare.innerText = `Airfare: ${personData.airfare}`;
    luggage.innerText = `Luggage type: ${personData.luggage}`;
  }
  appendMarkup(target) {
    target.appendChild(this.box);
  }
}

export class PersonCard {
  constructor(root_element, data) {
    this.controller = new PersonCard_controller(
      new PersonCard_model(data),
      new PersonCard_view(),
      root_element
    );
  }
}
