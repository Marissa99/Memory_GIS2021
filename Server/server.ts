import * as Http from "http";
import * as Url from "url"; 
import * as Mongo from "mongodb";


 //let urlDBLokal: string = "mongodb://localhost:27017"; //lokal testen
let urlDB: string = "mongodb+srv://Testuser2:Test123@marissareiser-gis21.8i9as.mongodb.net/Memory?retryWrites=true&w=majority";  //hier nochmals überprüfen ob es auf die richtige DB zugreift
 

let port: number = Number(process.env.PORT); //Port ist "Hafen" 
if (!port)
     port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)

     
serverStarten(port); //Server auf diesem Port starten


function serverStarten(_port: number | string): void {
    let server: Http.Server = Http.createServer(); //erstellen eines einfachen Servers
    console.log("Server gestartet");
    server.listen(_port);
    server.addListener("request", handleRequest);       
}
async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> { 
    console.log("Daten angekommen"); //Überprüfung ob Daten angekommen sind
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften von HTML
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis: * alle dürfen darauf zugreifen

    if (_request.url) {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
        let pathname: string = <string>url.pathname; //pathname in string speichern
    

    //Pfad für die 10besten ScoreDaten anzeigen
        if (pathname == "/") {
            console.log();
        }
    }

    //Pfad um die ScoreDaten in DB zu speichern

    //Pfad wenn man ein Bild in die DB hinzufügen möchte

    //Pfad wenn man ein Bild aus der DB löschen möchte
}




//Funktion Spielergebnis speichern auf Spieleseite

//Funktion Highscore Daten auf Highscore Seite

//Funktion Bilder Löschen auf der Admin Seite

//Funktion Bilder Hinzufügen auf der Admin Seite
