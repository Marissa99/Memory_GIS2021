//EventListener für die Memory Karten Rückseite
let rueckseiten: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Rueckseite"); //muss der Collection sagen das es Images sind
for (let i: number = 0; i < 16 ; i++) { //soll auf alle 16 Karten den Listener anwenden
    rueckseiten[i].addEventListener("click", bildAufdecken); //Zugriff auf das einzelne Element der Rückseite und Anwendung von Listener
}

let listRueck: Array<HTMLImageElement> = []; //leeres Array um die umgedrehten Karten/ Rückseiten zu speichern
let listFront: Array<HTMLImageElement> = []; //leeres Array um die Memory Bidler zu spreichern
let dateTimeBegin: Date; //Variable um Startzeit zu speichern
let dateTimeEnd: Date; //Variable um Endzeit zu speichern
let pairs: number = 0; // Variable: Anzahl der Paare
let clicks: number = 0; //Variable der Cklicks

//Funktion Memory Karten aus DB auswählen und zufällig anordnen










//Funktion Memory Karten aufdecken,vergleichen und Start/Endzeit zu ermitteln
function bildAufdecken(_event: Event): void {
    if (clicks == 0) { //um die Startzeit zu speichern
        dateTimeBegin = new Date(); 
        console.log(dateTimeBegin.getTime);
    }
    clicks = clicks + 1; //hochzählen der Clicks
    
    let geklicktesBild: HTMLImageElement = <HTMLImageElement>_event.target; //Objekt welches geklickt wurde --> bekommmt Image
   
    if (listRueck.length < 2) { //solange in der Liste der Rückseite noch keine 2 Bilder vorhanden sind
        let it: number = 0; //Laufvariable zum speichern
        for (let item of rueckseiten) { //collection der Rückseite durchgehen
            if ( item == geklicktesBild ) { //wenn position in collection Rückseite = geklicktes Bild
                let front: HTMLCollectionOf<HTMLImageElement> = <HTMLCollectionOf<HTMLImageElement>> document.getElementsByClassName("Bild"); //holen der Collection Bilder
                listFront.push(front[it]); //speichern in Liste
            }
            it++; //an welcher Stelle es nacher eine Übereinstimmung gibt
        }
        listRueck.push(geklicktesBild); //Element in Liste  speichern
        geklicktesBild.style.visibility = "hidden"; //Bild - Rückseite ausblenden
    }

    if (listRueck.length == 2) { //wenn 2 Elemente in der Liste sind (geklickt sind)

        if (listFront[0].src != listFront[1].src) { //wenn Stelle 0 und 1 NICHT übereinstimmen  (URL nicht stimmen)    
            listRueck.forEach(element => { //über die Liste mit Elementen drüber gehen 
                element.style.visibility = "visible"; //dann geklicktes Element sichtbar machen bzw. richtiges Bild  
            });  
            //Timer um das umgedrehte "falsche" Bild anzuzeigen
            setTimeout (bildAufdecken, 5000);
           
        }
        listRueck = []; //listRueck leeren um neuen Zug starten zu können
        listFront = []; //listFront leeren um neuen Zug starten zu können
    }       
    if (pairs == 8) { //wenn man 8 Paare gefunden hat, dann Endzeit speichern
        dateTimeEnd = new Date();
    }
}

//Funktion automatisches Wieterleitan auf die Spielergebnis Seite


