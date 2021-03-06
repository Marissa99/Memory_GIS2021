let buttonHinzufuegen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Hinzufuegen"); //Button mit EventListener
buttonHinzufuegen.addEventListener("click", addPicture);

//Funktion um Bild hinzufügen zu können 
async function addPicture(): Promise<void> {
    let form: FormData = new FormData(document.forms[0]); //Verwendung des 0 (ersten) <form>
    //let url: string = "http://localhost:8100";
    let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/hinzufuegen" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe: string = await response.text();
    console.log(ausgabe);
    }



let buttonEnfernen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Loeschen");
buttonEnfernen.addEventListener("click", removePicture);

//Funktion um Bild entfernen zu können
async function removePicture(): Promise<void> { 
    let form: FormData = new FormData(document.forms[1]); //Tipp von Lilli zwei unterschiedliche <form> auf Adminseite verwenden um getrennt darauf zugreifen zu können
    //let url: string = "http://localhost:8100";
    let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/loeschen" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe: string = await response.text();
    console.log(ausgabe); 
}


let divAnzeigen: HTMLDivElement = <HTMLDivElement>document.getElementById("bilderDB"); 
divAnzeigen.addEventListener("click", showPictures);

//Funktion Alle Bilder auf der Admin Seite anzeigen
async function showPictures(): Promise <void> {
    //let url: string = "http://localhost:8100";
    let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    url += "/anzeigenBilder";
    let response: Response = await fetch(url);
    let ausgabe: MemoryKarten[] = await response.json();
    console.log(ausgabe); 

    let anzeigeDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("bilderDB"); //um es auf der HTML Seite anzeigen zu können
    anzeigeDiv.innerHTML = ""; // um es immer zu aktualisieren muss es geleert werden
    
    for (let i: number = 0; i < ausgabe.length; i++) { //Gesamtes Array durchgehen und alle anzeigen
        let div: HTMLDivElement = showMemory(ausgabe[i]); //Aufruf der Funktion mit Übergabe der ausgabe
        anzeigeDiv.appendChild(div); //div an das Anzeigediv anhängen

    }
}

let buttonAnzeigen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Anzeigen");
buttonAnzeigen.addEventListener("click", showPictures);

function showMemory (_memory: MemoryKarten): HTMLDivElement {
    let memory: HTMLDivElement = document.createElement("div"); //Div Element erstellen
    memory.classList.add("BildUrl"); //https://developer.mozilla.org/de/docs/Web/API/Element/classList

    let image: HTMLImageElement = document.createElement ("img"); //Um die Bilder anzuzeigen
    image.src = _memory.url; //Bilder der Urls anziehen
    memory.appendChild(image);

    let url: HTMLParagraphElement = document.createElement("p"); //Um die Urls zu den Bildern zu sehen
    url.innerText = _memory.url; //Urls als Text anziegen
    memory.appendChild(url);

    return memory; // Rückgabewert damit DivElement akzepiert wird

}

//Interface für MemoryKarten
interface MemoryKarten {
    url: string;
}
