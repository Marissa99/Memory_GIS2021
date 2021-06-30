"use strict";
//EventlistRueckender für die Memory Karten
let rückseiten = document.getElementsByClassName("Rückseite"); //auf Image umschreiben
for (let i = 0; i < 16; i++) { //soll auf alle 16 Karten den listRueckener anwenden
    rückseiten[i].addEventListener("click", bildAufdecken); //Zugriff auf das einzelen Element und Anwendung von listRueckener
}
console.log("Top");
let listRueck = []; //leeres Array um die umgedrehten Karten zu speichern
let listFront = [];
let dateTimeBegin;
let dateTimeEnd;
let pairs = 0;
let clicks = 0;
//Funktion Memory Karten aufdecken und vergleichen
function bildAufdecken(_event) {
    if (clicks == 0) { //um die Startzeit zu speichern
        dateTimeBegin = new Date();
        console.log(dateTimeBegin.getTime);
    }
    clicks = clicks + 1;
    let geklicktesBild = _event.target; //Objekt welches geklickt wurde --> bekommmt Image
    if (listRueck.length < 2) { //solange in der Liste der Rückseite noch nicht 2 Bilder vorhanden sind
        let it = 0; //Laufvariable zum speichern
        for (let item of rückseiten) { //collection der Rückseite durchgehen
            if (item == geklicktesBild) { //wenn position in collection Rückseite = geklicktes Bild
                let front = document.getElementsByClassName("Bild"); //holen der Collection Bilder
                listFront.push(front[it]); //speichern in Liste
            }
            it++; //an welcher Stelle nacher eine Übereinstimmung gibt
        }
        listRueck.push(geklicktesBild); //Element is listRuecke speichern
        geklicktesBild.style.visibility = "hidden"; //Bild ausblenden
    }
    //Timer um das umgedrehte "falsche" Bild anzuzeigen
    if (listRueck.length == 2) { //wenn 2 Elemente in der listRuecke sind (geklickt sind)
        if (listFront[0].src != listFront[1].src) { //wenn stelle 0 und 1 NICHT übereinstimmen      
            listRueck.forEach(element => {
                element.style.visibility = "visible"; //dann geklicktes Element sichtbar machen bzw. richtiges Bild  
            });
        }
        listRueck = []; //listRueck leeren
        listFront = []; //listFront leeren
    }
    if (pairs == 8) { //für die Zeit
        dateTimeEnd = new Date();
    }
}
//# sourceMappingURL=Spieleseite.js.map