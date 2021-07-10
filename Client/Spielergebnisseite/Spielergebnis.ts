
let playTimeScore: number; //Variable um es zu speichern
playtime();

//Funktion playtime auf die andere Seite holen
async function playtime(): Promise <void> {
    let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    //let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/playTime"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let antwort: Response = await fetch(url);
    playTimeScore = await antwort.json();
    playTimeScore = Math.floor(playTimeScore / 1000); //um auf sec zu kommen durch 1000 teilen, Math.floor rundet die Sekunden
    showPlaytime();
}

//Funktion um Spieldauer auf der Seite anzuzeigen
async function showPlaytime(): Promise <void> {
    document.getElementById("Spielzeit").innerHTML = playTimeScore.toString() + " Sekunden";  //Anzeige auf der HTML Seite  
}



let buttonScoredaten: HTMLButtonElement = <HTMLButtonElement> document.getElementById("Abschicken"); //Button machen um es in DB hochzuspeichern
buttonScoredaten.addEventListener("click", saveDataScore );

//Speichern der Spielzeit und Name in DB
async function saveDataScore(event: Event): Promise <void> {
    event.preventDefault();
    // let form: FormData = new FormData(document.forms[0]);
    //let url: string = "http://localhost:8100";
    let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    // let query: URLSearchParams = new URLSearchParams(<any>form);
    // url = url + "/bilder" + "?" + query.toString();
    let response: Response = await fetch(url + "/bilder");
    console.log(await response.text()); 
}


