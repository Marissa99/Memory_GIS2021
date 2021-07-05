
let playTimeScore: number; //Variable um es zu speichern
playtime();

//Funktion playtime auf die andere Seite holen
async function playtime(): Promise <void> {
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/playTime"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let antwort: Response = await fetch(url);
    playTimeScore = await antwort.json();
    playTimeScore = Math.floor(playTimeScore / 60); //um auf sec zu kommen durch 60 teilen, Math.floor rundet die Sekunden
    ShowPlaytime();
}

//Funktion um Spieldauer auf der Seite anzuzeigen
async function ShowPlaytime(): Promise <void> {
    console.log("Show");
    document.getElementById("Spielzeit").innerHTML = playTimeScore.toString() + " Sekunden";    
}

//Speichern der Spielzeit und Name in DB


