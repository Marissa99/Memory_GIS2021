//EventListener für die Memory Karten Rückseite
let picturesCollection: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Bild"); //muss der Collection sagen das es Images sind
for (let i: number = 0; i < 16 ; i++) { //soll auf alle 16 Karten den Listener anwenden
    picturesCollection[i].addEventListener("click", bildAufdecken); //Zugriff auf das einzelne Element der Rückseite und Anwendung von Listener
}

let listFrontClicked: Array<HTMLImageElement> = []; //leeres Array um die umgedrehten Karten/ Rückseiten zu speichern
let listPictruresAll: Array<HTMLImageElement> = []; //leeres Array um die Memory Bidler zu spreichern
let dateTimeBegin: Date; //Variable um Startzeit zu speichern
let dateTimeEnd: Date; //Variable um Endzeit zu speichern
let pairs: number = 0; // Variable: Anzahl der Paare
let clicks: number = 0; //Variable der Cklicks


for (let item of <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Bild")) { //collection der Vorderseite durchgehen
    listPictruresAll.push(item); // jedes einzeln in Liste speichern
}

//Funktion Memory Karten aus DB auswählen und zufällig anordnen
/*function memoryAnordnen() {
    let daten: FormData = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/datenVerschicken"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let  query: URLSearchParams = new URLSearchParams(<any> daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort: Response = await fetch (url);
    let ausgabe: string = await antwort.json(ausgabe);

    for()
}*/



//Funktion Memory Karten aufdecken,vergleichen und Start/Endzeit zu ermitteln
function bildAufdecken(_event: Event): void {
    startTimeifClickZero(); //Aufrufen der Zeit starten Funktion

    console.log("test");
   
    let clickedPicture: HTMLImageElement = <HTMLImageElement>_event.target; //Objekt welches geklickt wurde --> bekommmt Image
   
    if (listFrontClicked.length < 2) { //solange in der Liste der Rückseite noch keine 2 Bilder vorhanden sind

        listFrontClicked.push(clickedPicture); //Element in Liste  speichern
        clickedPicture.style.opacity = "100%"; //Bild - Rückseite ausblenden
    }

    if (listFrontClicked.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)

        if (listFrontClicked[0].src != listFrontClicked[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            //Timer um das umgedrehte "falsche" Bild anzuzeigen
            setTimeout (bilderZudecken, 2000); //ruft die Funktion erst nach 5sec auf
        }
        else { //wenn die Bilder gleich sind
            listFrontClicked = []; //Liste leeren
        }
    }       
}

//Funktion Bilder zudecken
function bilderZudecken (): void {
    listFrontClicked.forEach(element => { // wie eine for Schleife über die Liste mit Elementen drüber gehen 
        element.style.opacity = "0%"; //dann geklicktes Element sichtbar machen bzw. richtiges Bild  
    });  
    listFrontClicked = []; //listRueck leeren um neuen Zug starten zu können
    
}

//Funktion Zeit starten
function startTimeifClickZero (): void {
    if (clicks == 0) { //um die Startzeit zu speichern
        dateTimeBegin = new Date(); 
        console.log(dateTimeBegin.getTime);
    }
    clicks = clicks + 1; //hochzählen der Clicks
}

//Funktion automatisches Wieterleitan auf die Spielergebnis Seite


