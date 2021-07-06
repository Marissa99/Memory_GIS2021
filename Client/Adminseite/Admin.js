"use strict";
let buttonHinzufuegen = document.getElementById("Hinzufuegen");
buttonHinzufuegen.addEventListener("click", clickAddPicture);
//Funktion um Bild hinzufügen zu können 
async function clickAddPicture() {
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
buttonEnfernen.addEventListener("click", clickRemovePicture);
//Funktion um Bild entfernen zu können
async function clickRemovePicture() {
    let form = new FormData(document.forms[0]);
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
let buttonAnzeigen = document.getElementById("Anzeigen");
buttonAnzeigen.addEventListener("click", clickShowPictures);
//Funktion Alle Bilder auf der Admin Seite anzeigen
async function clickShowPictures() {
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    url += "/anzeigenBilder";
    let response = await fetch(url);
    let ausgabe = await response.json();
    console.log(ausgabe);
    let anzeigeDiv = document.getElementById("bilderDB");
    anzeigeDiv.innerHTML = ""; // um es immer zu aktuelisieren muss es geleert werden
    for (let i = 0; i < ausgabe.length; i++) {
        let div = (ausgabe[i]);
        anzeigeDiv.appendChild(div);
    }
}
//# sourceMappingURL=Admin.js.map