"use strict";
//Funktion anzeigen Spielzeit (Endzeit - Anfangszeit)
let playTimeScore;
playtime();
async function playtime() {
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url = "http://localhost:8100"; //um es lokas zu testen
    url += "/playTime"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let antwort = await fetch(url);
    playTimeScore = await antwort.json();
    playTimeScore = Math.floor(playTimeScore / 60);
    ShowPlaytime();
}
async function ShowPlaytime() {
    console.log("Show");
    document.getElementById("Spielzeit").innerHTML = playTimeScore.toString() + " Sekunden";
}
//Speichern der Spielzeit und Name in DB
//# sourceMappingURL=Spielergebnis.js.map