"use strict";
//EventListener für die Memory Karten Rückseite
let picturesCollection = document.getElementsByClassName("Bild"); //muss der Collection sagen das es Images sind
for (let i = 0; i < 16; i++) { //soll auf alle 16 Karten den Listener anwenden
    picturesCollection[i].addEventListener("click", pictureDiscover); //Zugriff auf das einzelne Element der Bilder und Anwendung von Listener
}
let listFrontClicked = []; //leeres Array um die umgedrehten Karten/ Memory Bilder zu speichern
let listPictruresAll = []; //leeres Array um alle Memory Bidler zu spreichern
let listSelectedPictures = [];
let dateTimeBegin; //Variable um Startzeit zu speichern
let dateTimeEnd; //Variable um Endzeit zu speichern
let pairs = 0; // Variable: Anzahl der Paare
let clicks = 0; //Variable der Cklicks
for (let item of document.getElementsByClassName("Bild")) { //collection der Vorderseite/ Memory Bilder durchgehen
    listPictruresAll.push(item); // jedes einzeln in Liste speichern
}
//Funktion Bilder aus DB holen und random Bild-Url's auszusuchen
randomMemoryUrl();
async function randomMemoryUrl() {
    let daten = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url = "http://localhost:8100"; //um es lokas zu testen
    url += "/bilder"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort = await fetch(url);
    let outputArray = await antwort.json();
    console.log(outputArray);
    //sucht mit 8 Url's aus der Liste aus
    let count = 0;
    while (count < 8) {
        let randomNumber = Math.floor(Math.random() * (outputArray.length)); // Zufallszahl generieren mit Grenzen (max und 0) https://www.codegrepper.com/code-examples/javascript/random+number+generator+in+typescript 
        let randomURl = outputArray[randomNumber].url; //Typ MemoryKarten mit Attribut Url
        let check = false;
        if (listSelectedPictures.length > 0) {
            listSelectedPictures.forEach(element => {
                if (element == randomURl) {
                    check = true;
                }
            });
        }
        if (!check) { //Check ob Url schon vorhanden ist
            listSelectedPictures.push(randomURl);
            count++;
        }
    }
    //Verdoppelt die 8 Url's
    listSelectedPictures.push(...listSelectedPictures); //Funktion push akzepiert Liste nur mit ... https://www.tutorialspoint.com/typescript/typescript_array_push.htm
    //console.log(listSelectedPictures); 
    arrangeMemory();
} //Ende Funktion randomMemoryUrl
//Funktion die 16 Url's zu mischen und auf die Tabelle anzuweden
function arrangeMemory() {
    listSelectedPictures.sort(() => .5 - Math.random()); //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    console.log(listSelectedPictures);
    for (let i = 0; i < 16; i++) { //um alle 16 urls verteilen zu können
        picturesCollection[i].src = listSelectedPictures[i]; //PictrueCollection - placeholder Bilder durch die Urls der SelctedPictures ersetzen
    }
}
//Funktion Memory Karten aufdecken und vergleichen und Start/Endzeit Funktion aufrufen
function pictureDiscover(_event) {
    startTimeifClickZero(); //Aufrufen der Zeit starten Funktion
    let clickedPicture = _event.target; //Objekt welches geklickt wurde --> bekommmt Image
    if (listFrontClicked.length < 2) { //solange in der Liste der Memory Bilder noch keine 2 Bilder vorhanden sind
        listFrontClicked.push(clickedPicture); //Element in Liste  speichern
        clickedPicture.style.opacity = "100%"; //Memory einblenden
    }
    if (listFrontClicked.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)
        if (listFrontClicked[0].src != listFrontClicked[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            setTimeout(pictureCoverUp, 1000); //ruft die Funktion bilderZudecken erst nach 5sec auf
        }
        else { //wenn die Bilder gleich sind
            pairs++; //Paare hochzählen wenn sie gleich sind, um stäter endzeit zu haben
            listFrontClicked = []; //Liste leeren
        }
    }
    endTimeif8Pairs();
}
//Funktion Bilder zudecken
function pictureCoverUp() {
    listFrontClicked.forEach(element => {
        element.style.opacity = "0%"; //dann geklicktes Element/ Memory Bild ausblenden -->Rückseite wird sichtbar
    });
    listFrontClicked = []; //Liste leeren um neuen Zug starten zu können
}
//Funktion Zeit starten
function startTimeifClickZero() {
    if (clicks == 0) { //Startzeit bei 0 clicks beginnen
        dateTimeBegin = new Date(); //um die Startzeit zu speichern
        console.log(dateTimeBegin.getTime()); //Zur Kontrolle in Konsole ausgeben -->in ms angeben
    }
    clicks = clicks + 1; //hochzählen der Clicks
}
//Funktion Endzeit des Spieles (Endzeit - Startzeit als Json übergeben)
async function endTimeif8Pairs() {
    if (pairs == 8) { //Wird in Funktion PictrueDiscover hochgezählt wenn eins gefunden wurde
        dateTimeEnd = new Date();
        let form = new FormData();
        form.append("begin", dateTimeBegin.getTime().toString());
        form.append("end", dateTimeEnd.getTime().toString());
        let url = "http://localhost:8100"; //um es lokas zu testen
        url += "/score"; // Anhängen mit einem / daher oben keiner notwenig
        //tslint:disable-next-line 
        let query = new URLSearchParams(form);
        url = url + "?" + query.toString(); //Url in String umwandeln
        let antwort = await fetch(url);
        console.log(antwort);
    }
}
//# sourceMappingURL=Spieleseite.js.map