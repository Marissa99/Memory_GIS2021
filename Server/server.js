"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//let urlDBLokal: string = "mongodb://localhost:27017"; //lokal testen
let urlDB = "mongodb+srv://Testuser2:Test123@marissareiser-gis21.8i9as.mongodb.net/Memory?retryWrites=true&w=majority"; // neue Datenbank Memory
let port = Number(process.env.PORT); //Port ist "Hafen" 
if (!port)
    port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)
serverStarten(port); //Server auf diesem Port starten
let playTime;
//Funktion Server starten
function serverStarten(_port) {
    let server = Http.createServer(); //erstellen eines einfachen Servers
    console.log("Server gestartet");
    server.listen(_port);
    server.addListener("request", handleRequest);
}
//Funktion HandleRequest mit if Abfragen (welcher Pfadname) aufgerufen wird
async function handleRequest(_request, _response) {
    console.log("Anfrage angekommen"); //Überprüfung ob Anfragen angekommen sind
    _response.setHeader("content-type", "application/json; charset=utf-8"); //Eigenschaften von JSON
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis: * alle dürfen darauf zugreifen
    if (_request.url) {
        let url = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
        let pathname = url.pathname; //pathname in string speichern
        let highscore = { spielername: url.query.spielername + "", zeit: parseInt(url.query.zeit + "") }; //parseInt um in string zumzuwanden und "" zum erkennen
        let memoryKarte = { url: url.query.url + "" }; //Variable für MemoryKarten
        let toDelete = url.query.urlDelete + ""; //Url aus meinem Inputfeld holen
        //Pfad um Bilder aus Datenbank holen
        if (pathname == "/bilder") {
            let pictureData = await getPictures(urlDB);
            _response.write(JSON.stringify(pictureData));
        }
        //Pfad um alle Bilder auf der AdminSeite anzuzeigen
        else if (pathname == "/anzeigenBilder") {
            let anzeigen = await getPictures(urlDB);
            _response.write(JSON.stringify(anzeigen));
        }
        //Pfad um auf der Adminseite ein Bild in die DB hinzuzufügen
        else if (pathname == "/hinzufuegen") {
            let memoryKarten = await addPictures(urlDB, memoryKarte);
            console.log(memoryKarten); //Zur Kontrolle
            _response.write(JSON.stringify(memoryKarten));
        }
        //Pfad um auf der Adminseite ein Bild aus der Datenbank zu löschen
        else if (pathname == "/loeschen") {
            let memoryKarten = await deletePictures(urlDB, toDelete);
            _response.write(JSON.stringify(memoryKarten));
        }
        //Pfad 
        else if (pathname == "/score") {
            let url = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
            playTime = Number(url.query.end) - Number(url.query.begin); //string in zahl umwandeln, voneinander abziehen und speichern
        }
        //Pfad um auf Spieleergebnisseite die Zeit anzuzeigen
        else if (pathname == "/playTime") {
            _response.write(JSON.stringify(playTime));
            playTime = 0; //für den nächsten Spieler wieder auf 0 setzen
        }
        //Pfad um die ScoreDaten in DB zu speichern -->Button auf Spielergebnisseite (Bestätigen und senden)
        else if (pathname == "/abschickenScore") {
            await saveHighscoreData(urlDB, highscore);
        }
        /*
        //Pfad für die 10 besten ScoreDaten anzeigen
         else if (pathname == "/anzeigenScore") {
            let anzeige: string = await showScore();
            _response.write(anzeige);
        }*/
    }
    _response.end();
} // Ende Funktion Handle Request
//Funktion Bilder aus Datenbank auslesen/ holen
async function getPictures(_url) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    console.log(_url);
    let infos = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    let cursor = infos.find(); //Suche der gesamten DB aber spezielle ist auch möglich mit .find({name: "..."})
    let result = await cursor.toArray(); //auslesen der kompletten DB
    return result;
}
//Funktion Bilder Löschen auf der Admin Seite
async function deletePictures(_url, _name) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    let infos = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    console.log(_name);
    infos.deleteOne({ url: _name }); //ein Element mit dem Namen löschen (in DB heißt es url)
    return "Bild gelöscht";
}
//Funktion Bilder Hinzufügen auf der Admin Seite
async function addPictures(_url, _memoryKarte) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    let infos = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    infos.insertOne(_memoryKarte); // ein Element hinzufügen und in DB speichern
    return "Bild hinzugefügt";
}
//Funktion Highscore Daten aus Spieleergebnisseite in DB speichern
async function saveHighscoreData(_url, _highscore) {
    let options = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    let infos = mongoClient.db("Memory").collection("Highscore"); //Collection Highscore verwenden
    infos.insertOne(_highscore); //Element in Collection speichern
}
//# sourceMappingURL=server.js.map