

//EventListener für die Memory Karten Rückseite
let picturesCollection: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Bild"); //muss der Collection sagen das es Images sind
for (let i: number = 0; i < 16 ; i++) { //soll auf alle 16 Karten den Listener anwenden
    picturesCollection[i].addEventListener("click", pictureDiscover); //Zugriff auf das einzelne Element der Bilder und Anwendung von Listener
}

let listFrontClicked: Array<HTMLImageElement> = []; //leeres Array um die umgedrehten Karten/ Memory Bilder zu speichern
let listPictruresAll: Array<HTMLImageElement> = []; //leeres Array um alle Memory Bidler zu spreichern
let listSelectedPictures: Array<string> = [];
let dateTimeBegin: Date; //Variable um Startzeit zu speichern
let dateTimeEnd: Date; //Variable um Endzeit zu speichern
let pairs: number = 0; // Variable: Anzahl der Paare
let clicks: number = 0; //Variable der Cklicks


for (let item of <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Bild")) { //collection der Vorderseite/ Memory Bilder durchgehen
    listPictruresAll.push(item); // jedes einzeln in Liste speichern
}

//Funktion Bilder aus DB holen und random Bild-Url's auszusuchen
randomMemoryUrl(); 
async function randomMemoryUrl(): Promise <void> {
    let daten: FormData = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/bilder"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let  query: URLSearchParams = new URLSearchParams(<any> daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort: Response = await fetch(url);
    let outputArray: MemoryKarten[] = await antwort.json();
    console.log(outputArray);
    
    //sucht mit 8 Url's aus der Liste aus
    let count: number = 0;
    while (count < 8) { 
        let randomNumber: number = Math.floor(Math.random() * (outputArray.length)); // Zufallszahl generieren mit Grenzen (max und 0) https://www.codegrepper.com/code-examples/javascript/random+number+generator+in+typescript 
        let randomURl: string = outputArray[randomNumber].url; //Typ MemoryKarten mit Attribut Url
        let check: Boolean = false;
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
}//Ende Funktion randomMemoryUrl


//Funktion die 16 Url's zu mischen und auf die Tabelle anzuweden
function arrangeMemory (): void {
    listSelectedPictures.sort( () => .5 - Math.random() );
    console.log(listSelectedPictures);

    for(let i: number = 0; i < 16 ; i++) { //um alle 16 urls verteilen zu können
        document.getElementsByClassName("Bild").src = "Night";
    }
    

}


//Funktion Memory Karten aufdecken und vergleichen und Start/Endzeit Funktion aufrufen
function pictureDiscover(_event: Event): void {
    startTimeifClickZero(); //Aufrufen der Zeit starten Funktion
   
    let clickedPicture: HTMLImageElement = <HTMLImageElement>_event.target; //Objekt welches geklickt wurde --> bekommmt Image
   
    if (listFrontClicked.length < 2) { //solange in der Liste der Memory Bilder noch keine 2 Bilder vorhanden sind
        listFrontClicked.push(clickedPicture); //Element in Liste  speichern
        clickedPicture.style.opacity = "100%"; //Rückseite einblenden
    }

    if (listFrontClicked.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)
        if (listFrontClicked[0].src != listFrontClicked[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            setTimeout (pictureCoverUp, 2000); //ruft die Funktion bilderZudecken erst nach 5sec auf
        }
        else { //wenn die Bilder gleich sind
            listFrontClicked = []; //Liste leeren
        }
    }       
}

//Funktion Bilder zudecken
function pictureCoverUp (): void {
    listFrontClicked.forEach(element => { // wie eine for Schleife um über die Liste mit Elementen drüber zu gehen 
        element.style.opacity = "0%"; //dann geklicktes Element/ Memory Bild ausblenden -->Rückseite wird sichtbar
    });  
    listFrontClicked = []; //Liste leeren um neuen Zug starten zu können
    
}

//Funktion Zeit starten
function startTimeifClickZero (): void {
    if (clicks == 0) { //Startzeit bei 0 clicks beginnen
        dateTimeBegin = new Date(); //um die Startzeit zu speichern
        console.log(dateTimeBegin.getTime()); //Zur Kontrolle in Konsole ausgeben -->in ms angeben
    }
    clicks = clicks + 1; //hochzählen der Clicks
}
//Funktion Endzeit des Spieles
function endTimeif8Pairs(): void {
    if (pairs == 8) {
        dateTimeEnd = new Date();
        console.log();

    }

}
//Interface für MemoryKarten
interface MemoryKarten {
    url: string;
}

//Funktion automatisches Wieterleitan auf die Spielergebnis Seite