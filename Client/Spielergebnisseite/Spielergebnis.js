"use strict";
let playTimeScore; //Variable um es zu speichern
playtime();
//Funktion playtime auf die andere Seite holen
async function playtime() {
    let url = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    //let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/playTime"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let antwort = await fetch(url);
    playTimeScore = await antwort.json();
    playTimeScore = Math.floor(playTimeScore / 1000); //um auf sec zu kommen durch 1000 teilen, Math.floor rundet die Sekunden
    showPlaytime();
}
//Funktion um Spieldauer auf der Seite anzuzeigen
async function showPlaytime() {
    document.getElementById("Spielzeit").innerHTML = playTimeScore.toString() + " Sekunden"; //Anzeige auf der HTML Seite  
}
let buttonScoredaten = document.getElementById("Abschicken"); //Button machen um es in DB hochzuspeichern
buttonScoredaten.addEventListener("click", saveDataScore);
//Speichern der Spielzeit und Name in DB
async function saveDataScore() {
    //let url: string = "http://localhost:8100";
    let url = "https://gissose2021mr.herokuapp.com";
    let spielername = document.getElementById("Name").value;
    console.log(spielername);
    let response = await fetch(url + "/abschickenScore?spielername=" + spielername);
    console.log(await response.text());
    window.location.href = "../HTML/Score.html";
}
//# sourceMappingURL=Spielergebnis.js.map