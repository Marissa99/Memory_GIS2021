"use strict";
let buttonHinzufuegen = document.getElementById("Hinzufuegen");
buttonHinzufuegen.addEventListener("click", addPicture);
//Funktion um Bild hinzufügen zu können 
async function addPicture() {
    let form = new FormData(document.forms[0]);
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(form);
    url = url + "/hinzufuegen" + "?" + query.toString();
    let response = await fetch(url);
    let ausgabe = await response.text();
    console.log(ausgabe);
}
let buttonEnfernen = document.getElementById("Loeschen");
buttonEnfernen.addEventListener("click", removePicture);
//Funktion um Bild entfernen zu können
async function removePicture() {
    let form = new FormData(document.forms[1]);
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(form);
    url = url + "/loeschen" + "?" + query.toString();
    let response = await fetch(url);
    let ausgabe = await response.text();
    console.log(ausgabe);
}
let divAnzeigen = document.getElementById("bilderDB");
divAnzeigen.addEventListener("click", showPictures);
//Funktion Alle Bilder auf der Admin Seite anzeigen
async function showPictures() {
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    url += "/anzeigenBilder";
    let response = await fetch(url);
    let ausgabe = await response.json();
    console.log(ausgabe);
    let anzeigeDiv = document.getElementById("bilderDB");
    anzeigeDiv.innerHTML = ""; // um es immer zu aktualisieren muss es geleert werden
    for (let i = 0; i < ausgabe.length; i++) { //Array durchgehen und alle anzeigen
        let div = showMemory(ausgabe[i]); //Aufgruf der Funktion mit Übergabe der
        anzeigeDiv.appendChild(div);
    }
}
let buttonAnzeigen = document.getElementById("Anzeigen");
buttonAnzeigen.addEventListener("click", showPictures);
function showMemory(_memory) {
    let memory = document.createElement("div");
    memory.classList.add("BildUrl"); //https://developer.mozilla.org/de/docs/Web/API/Element/classList
    let image = document.createElement("img"); //Um die Bilder anzuzeigen
    image.src = _memory.url;
    memory.appendChild(image);
    let url = document.createElement("p"); //Um die Urls zu den Bildern zu sehen
    url.innerText = _memory.url;
    memory.appendChild(url);
    return memory; // Rückgabewert damit DivElement akzepiert wird
}
//# sourceMappingURL=Admin.js.map