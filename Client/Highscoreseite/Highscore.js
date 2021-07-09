"use strict";
let nameCollection = document.getElementsByClassName("playerName");
let timeCollection = document.getElementsByClassName("time");
showScore();
//Funktion um die 10 Besten Score Daten anzuzeigen
async function showScore() {
    let form = new FormData(document.forms[0]);
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(form);
    url = url + "/anzeigenScore" + "?" + query.toString();
    let response = await fetch(url);
    let ausgabe = await response.json();
    //Alle Score Daten sortieren (kurze nach lange Spieldauer) 
    ausgabe.sort((a, b) => a.zeit - b.zeit); // Sorteren der DB nach Zeit https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    for (let i = 0; i < 10; i++) { //Array durchgehen und alle anzeigen
        nameCollection[i].innerText = "Name: " + ausgabe[i].spielername;
        timeCollection[i].innerText = "Dauer: " + (ausgabe[i].zeit / 1000).toString() + " Sekunden";
    }
}
//# sourceMappingURL=Highscore.js.map