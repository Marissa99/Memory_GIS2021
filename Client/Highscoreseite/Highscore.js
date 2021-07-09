"use strict";
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
    let ausgabe = await response.text();
    console.log(ausgabe);
    //Alle Score Daten sortieren (kurze nach lange Spieldauer) 
    //um dann die 10 Besten raussuchen und ausgeben zu können -->for Schleife 
}
//# sourceMappingURL=Highscore.js.map