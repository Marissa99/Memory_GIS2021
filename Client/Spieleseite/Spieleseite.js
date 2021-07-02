"use strict";
//EventListener für die Memory Karten Rückseite
let picturesCollection = document.getElementsByClassName("Bild"); //muss der Collection sagen das es Images sind
for (let i = 0; i < 16; i++) { //soll auf alle 16 Karten den Listener anwenden
    picturesCollection[i].addEventListener("click", bildAufdecken); //Zugriff auf das einzelne Element der Rückseite und Anwendung von Listener
}
let listFrontClicked = []; //leeres Array um die umgedrehten Karten/ Rückseiten zu speichern
let listPictruresAll = []; //leeres Array um die Memory Bidler zu spreichern
let dateTimeBegin; //Variable um Startzeit zu speichern
let dateTimeEnd; //Variable um Endzeit zu speichern
let pairs = 0; // Variable: Anzahl der Paare
let clicks = 0; //Variable der Cklicks
for (let item of document.getElementsByClassName("Bild")) { //collection der Vorderseite durchgehen
    listPictruresAll.push(item); // jedes einzeln in Liste speichern
}
//Funktion Memory Karten aufdecken,vergleichen und Start/Endzeit zu ermitteln
function bildAufdecken(_event) {
    startTimeifClickZero(); //Aufrufen der Zeit starten Funktion
    console.log("test");
    let clickedPicture = _event.target; //Objekt welches geklickt wurde --> bekommmt Image
    if (listFrontClicked.length < 2) { //solange in der Liste der Rückseite noch keine 2 Bilder vorhanden sind
        listFrontClicked.push(clickedPicture); //Element in Liste  speichern
        clickedPicture.style.opacity = "100%"; //Bild - Rückseite ausblenden
    }
    if (listFrontClicked.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)
        if (listFrontClicked[0].src != listFrontClicked[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            //Timer um das umgedrehte "falsche" Bild anzuzeigen
            setTimeout(bilderZudecken, 2000); //ruft die Funktion erst nach 5sec auf
        }
        else { //wenn die Bilder gleich sind
            listFrontClicked = []; //Liste leeren
        }
    }
}
//Funktion Bilder zudecken
function bilderZudecken() {
    listFrontClicked.forEach(element => {
        element.style.opacity = "0%"; //dann geklicktes Element sichtbar machen bzw. richtiges Bild  
    });
    listFrontClicked = []; //listRueck leeren um neuen Zug starten zu können
}
//Funktion Zeit starten
function startTimeifClickZero() {
    if (clicks == 0) { //um die Startzeit zu speichern
        dateTimeBegin = new Date();
        console.log(dateTimeBegin.getTime());
    }
    clicks = clicks + 1; //hochzählen der Clicks
}
//Funktion automatisches Wieterleitan auf die Spielergebnis Seite
//# sourceMappingURL=Spieleseite.js.map