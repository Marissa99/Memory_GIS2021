"use strict";
let playTimeScore; //Variable um es zu speichern
playtime();
//Funktion playtime auf die andere Seite holen
async function playtime() {
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url = "http://localhost:8100"; //um es lokas zu testen
    url += "/playTime"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let antwort = await fetch(url);
    playTimeScore = await antwort.json();
    playTimeScore = Math.floor(playTimeScore / 60); //um auf sec zu kommen durch 60 teilen, Math.floor rundet die Sekunden
    showPlaytime();
}
//Funktion um Spieldauer auf der Seite anzuzeigen
async function showPlaytime() {
    console.log("Show");
    document.getElementById("Spielzeit").innerHTML = playTimeScore.toString() + " Sekunden";
}
let buttonScoredaten = document.getElementById("Abschicken"); //Button machen auf DeinScore
buttonScoredaten.addEventListener("click", saveDataScore);
//Speichern der Spielzeit und Name in DB
async function saveDataScore() {
    let form = new FormData(document.forms[0]);
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(form);
    url = url + "/abschickenScore" + "?" + query.toString();
    let response = await fetch(url);
    let ausgabe = await response.text();
    console.log(ausgabe);
}
//# sourceMappingURL=Spielergebnis.js.map