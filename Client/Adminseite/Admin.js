"use strict";
let buttonHinzufuegen = document.getElementById("Hinzufuegen"); //Button mit EventListener
buttonHinzufuegen.addEventListener("click", addPicture);
//Funktion um Bild hinzufügen zu können 
async function addPicture() {
    let form = new FormData(document.forms[0]); //Verwendung des 0 (ersten) <form>
    //let url: string = "http://localhost:8100";
    let url = "https://gissose2021mr.herokuapp.com";
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
    let form = new FormData(document.forms[1]); //Tipp von Lilli zwei unterschiedliche <form> auf Adminseite verwenden um getrennt darauf zugreifen zu können
    //let url: string = "http://localhost:8100";
    let url = "https://gissose2021mr.herokuapp.com";
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
    //let url: string = "http://localhost:8100";
    let url = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    url += "/anzeigenBilder";
    let response = await fetch(url);
    let ausgabe = await response.json();
    console.log(ausgabe);
    let anzeigeDiv = document.getElementById("bilderDB"); //um es auf der HTML Seite anzeigen zu können
    anzeigeDiv.innerHTML = ""; // um es immer zu aktualisieren muss es geleert werden
    for (let i = 0; i < ausgabe.length; i++) { //Gesamtes Array durchgehen und alle anzeigen
        let div = showMemory(ausgabe[i]); //Aufruf der Funktion mit Übergabe der ausgabe
        anzeigeDiv.appendChild(div); //div an das Anzeigediv anhängen
    }
}
let buttonAnzeigen = document.getElementById("Anzeigen");
buttonAnzeigen.addEventListener("click", showPictures);
function showMemory(_memory) {
    let memory = document.createElement("div"); //Div Element erstellen
    memory.classList.add("BildUrl"); //https://developer.mozilla.org/de/docs/Web/API/Element/classList
    let image = document.createElement("img"); //Um die Bilder anzuzeigen
    image.src = _memory.url; //Bilder der Urls anziehen
    memory.appendChild(image);
    let url = document.createElement("p"); //Um die Urls zu den Bildern zu sehen
    url.innerText = _memory.url; //Urls als Text anziegen
    memory.appendChild(url);
    return memory; // Rückgabewert damit DivElement akzepiert wird
}
//# sourceMappingURL=Admin.js.map