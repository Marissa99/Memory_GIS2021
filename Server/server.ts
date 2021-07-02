import * as Http from "http";
import * as Url from "url"; 
import * as Mongo from "mongodb";



//let urlDBLokal: string = "mongodb://localhost:27017"; //lokal testen
let urlDBMemory: string = "mongodb+srv://Testuser2:Test123@marissareiser-gis21.8i9as.mongodb.net/Memory?retryWrites=true&w=majority";  //richtige DB und Collection MemoryKarten verwenden
let urlDBHighscore: string = "" ; //richtige DB und Collection Highscore verwenden

let port: number = Number(process.env.PORT); //Port ist "Hafen" 
if (!port)
     port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)

     
serverStarten(port); //Server auf diesem Port starten

//Funktion Server starten
function serverStarten(_port: number | string): void {
    let server: Http.Server = Http.createServer(); //erstellen eines einfachen Servers
    console.log("Server gestartet");
    server.listen(_port);
    server.addListener("request", handleRequest);       
}

//Funktion mit if Abfragen (welcher Pfadname) aufgerufen wird
async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> { 
    console.log("Daten angekommen"); //Überprüfung ob Daten angekommen sind
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften von HTML
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis: * alle dürfen darauf zugreifen

    if (_request.url) {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
        let pathname: string = <string>url.pathname; //pathname in string speichern
        let highscore: HighscoreDaten = {};
        let memoryKarte: MemoryKarten = {bild: url.query.bild + "", url: url.query.url + "" }; 

    
    
        //Pfad um die ScoreDaten in DB zu speichern -->Button auf Spielergebnisseite (Bestätigen und senden)
        if (pathname == "/Abschicken") {
            let antwort: string = await HighscoreDatenSpeichern(urlDBHighscore, highscore);
            console.log(antwort);
            _response.write(antwort);
        }
        //Pfad für die 10besten ScoreDaten anzeigen
        else if (pathname == "/") {
            console.log();
        }


        //Pfad wenn man ein Bild in die DB hinzufügen möchte
        else if (pathname == "/Hinzufuegen") {
            let memoryKarten: MemoryKarten [] = await bilderHinzufuegen (urlDBMemory, memoryKarte);
            console.log(memoryKarten);
            _response.write(JSON.stringify(memoryKarten));
        }   

    //Pfad wenn man ein Bild aus der DB löschen möchte
        else if (pathname == "/Loeschen") {
            let memoryKarten: MemoryKarten [] = await bildLoeschen (urlDBMemory, );
            console.log(memoryKarten);
            _response.write(JSON.stringify(memoryKarten));
        }
    }   
}// Ende Funktion Handle Request





//Funktion Spielergebnis speichern auf Spieleseite




  

//Funktion Highscore Daten auf Highscore Seite
async function HighscoreDatenSpeichern(_url: string, _highscore: HighscoreDaten): Promise<string> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
}

//Funktion Bilder Löschen auf der Admin Seite
async function bildLoeschen (_url: string, _name: string): Promise<MemoryKarten[]> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    infos.deleteOne ({name: _name}); //ein Element mit dem Namen löschen

    let  cursor: Mongo.Cursor = infos.find(); //Suche der gesamten DB aber spezielle ist auch möglich mit .find({name: "..."})
    let result: MemoryKarten[] = await cursor.toArray(); //auslesen der kompletten DB
    return result;
}

//Funktion Bilder Hinzufügen auf der Admin Seite
async function bilderHinzufuegen (_url: string, _memoryKarte: MemoryKarten): Promise<MemoryKarten[]> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    infos.insertOne(_memoryKarte); // ein Element hinzufügen und in DB speichern

    let  cursor: Mongo.Cursor = infos.find(); //Suche der gesamten DB aber spezielle ist auch möglich mit .find({name: "..."})
    let result: MemoryKarten[] = await cursor.toArray(); //auslesen der kompletten DB
    return result;
}






//Interface für MemoryKarten
interface MemoryKarten {
    bild: string;
    url: string;
}

//Interface für die HighscoreDaten
interface HighscoreDaten {
    spielername: string;
    zeit: number;
}
