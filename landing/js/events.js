$(() => {
  console.log("Events...");
  fetch('./assets/data/events.json')
    .then((response) => response.json())
    .then((json) => filterCurrentOrFuture(json))
    .then((data) => mapEventsToCards(data));
});

const filterCurrentOrFuture = (data) => {
  return new Promise((resolve) => {
    var currentDate = new Date();
    resolve(data.filter((x) => new Date(x.dateFrom) >= currentDate));
  });
};

const mapEventsToCards = (data) => {
  const elem = document.getElementById("events");
  elem.innerHTML = "";
  data.forEach(x => elem.appendChild(createCard(x)));
}

const createCard = (item) => {
  const cardElm = document.createElement("div");
  cardElm.className = "card";
  cardElm.style = "margin: 5px;";
  cardElm.appendChild(addCardImage(item));
  cardElm.appendChild(addCardBody(item));
  cardElm.appendChild(addCardFooter(item));
  return cardElm;
}

const addCardImage = (item) => { 
  const imgElm = document.createElement("img");
  imgElm.src = item.imagePath;
  imgElm.style = "aspect-ratio: 1.2;";
  imgElm.className = "card-img-top";
  imgElm.alt = "Event logo";
  return imgElm;
}

const addCardBody = (item) => { 
  const bodyElm = document.createElement("div");
  bodyElm.className = "card-body";

  const titleElm = document.createElement("h5");
  titleElm.innerHTML = item.title;
  titleElm.className = "card-title";
  bodyElm.appendChild(titleElm);

  const textElm = document.createElement("p");
  textElm.className = "card-text";
  const subtextElm = document.createElement("small");
  subtextElm.innerHTML = item.location.placeName;
  textElm.appendChild(subtextElm);
  bodyElm.appendChild(textElm);

  const refElm = document.createElement("a");
  refElm.href = item.website != "" ? item.website : "#";
  refElm.className = "btn btn-primary mt-2";
  refElm.innerText = "Details";
  bodyElm.appendChild(refElm);

  return bodyElm;
}

const addCardFooter = (item) => { 
  const footerElm = document.createElement("div");
  footerElm.className = "card-footer";

  const titleElm = document.createElement("small");
  var eventDate = new Date(item.dateFrom);
  titleElm.innerHTML = `${eventDate.toLocaleDateString()},  ${eventDate.toLocaleTimeString()} → ${(new Date(item.dateTo)).toLocaleTimeString()}`;
  titleElm.className = "text-body-secondary";
  footerElm.appendChild(titleElm);
  footerElm.style = "color: black;";

  return footerElm;
}