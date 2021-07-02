"use strict";
initMemory();
async function initMemory() {
    console.log("hallo");
    let daten = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url = "http://localhost:8100"; //um es lokas zu testen
    url += "/bilder"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort = await fetch(url);
    console.log(antwort);
    console.log(await antwort.text());
    console.log(await antwort.json());
}
//# sourceMappingURL=InitMemory.js.map