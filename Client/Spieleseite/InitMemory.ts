initMemory();

async function initMemory(): Promise <void> {
    console.log("hallo");
    let daten: FormData = new FormData(document.forms[0]); //FormData Objekt generieren
    //let url: RequestInfo = "https://gissose2021mr.herokuapp.com"; //Verknüpfung mit der herokuapp
    let url: RequestInfo = "http://localhost:8100"; //um es lokas zu testen
    url += "/bilder"; // Anhängen mit einem / daher oben keiner notwenig
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let  query: URLSearchParams = new URLSearchParams(<any> daten);
    url = url + "?" + query.toString(); //Url in String umwandeln
    let antwort: Response = await fetch (url);
    console.log(antwort);
    console.log(await antwort.text());
    console.log(await antwort.json());



}