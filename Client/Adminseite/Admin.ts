let buttonHinzufuegen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Hinzufuegen");
buttonHinzufuegen.addEventListener("click", clickAddPicture);

//Funktion um Bild hinzufügen zu können 
async function clickAddPicture(): Promise<void> {
    let form: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/hinzufuegen" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe: string = await response.text();
    console.log(ausgabe);
    }



let buttonEnfernen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Loeschen");
buttonEnfernen.addEventListener("click", clickRemovePicture);

//Funktion um Bild entfernen zu können
async function clickRemovePicture(): Promise<void> { //Id des Bildes eingeben um es zu löschen
    let form: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/loeschen" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe: string = await response.text();
    console.log(ausgabe); 
}


let buttonAnzeigen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Anzeigen");
buttonAnzeigen.addEventListener("click", clickShowPictures);

//Funktion Alle Bilder auf der Admin Seite anzeigen
async function clickShowPictures(): Promise <void> {
    let url: string = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    url += "/anzeigenBilder";
    let response: Response = await fetch(url);
    let ausgabe: MemoryKarten[] = await response.json();
    console.log(ausgabe); 

    let anzeigeDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("bilderDB"); 
    anzeigeDiv.innerHTML = ""; // um es immer zu aktuelisieren muss es geleert werden
    
    for (let i: number = 0; i < ausgabe.length; i++) {
        let div: HTMLDivElement = (ausgabe[i]);
        anzeigeDiv.appendChild(div);

    }
}

