
import * as Http from "http";
import * as Url from "url"; 
import * as Mongo from "mongodb";




//let urlDBLokal: string = "mongodb://localhost:27017"; //lokal testen
let urlDB: string = "mongodb+srv://Testuser2:Test123@marissareiser-gis21.8i9as.mongodb.net/Memory?retryWrites=true&w=majority";  // neue Datenbank Memory

let port: number = Number(process.env.PORT); //Port ist "Hafen" 
if (!port)
     port = 8100; //Port wird auf 8100 gesetzt (localhost:8100)

    
serverStarten(port); //Server auf diesem Port starten

let playTime: number;


//Funktion Server starten
function serverStarten(_port: number | string): void {
    let server: Http.Server = Http.createServer(); //erstellen eines einfachen Servers
    console.log("Server gestartet");
    server.listen(_port);
    server.addListener("request", handleRequest);       
}

//Funktion HandleRequest mit if Abfragen (welcher Pfadname) aufgerufen wird
async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise <void> { 
    console.log("Anfrage angekommen"); //Überprüfung ob Anfragen angekommen sind
    _response.setHeader("content-type", "text/html; charset=utf-8"); //Eigenschaften von JSON "application/json; charset=utf-8"
    _response.setHeader("Access-Control-Allow-Origin", "*"); //Zugriffserlaubnis: * alle dürfen darauf zugreifen

    if (_request.url) {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
        let pathname: string = <string>url.pathname; //pathname in string speichern
        let memoryKarte: MemoryKarten = {url: url.query.url + "" }; //Variable für MemoryKarten
        let toDelete: string | string [] = url.query.urlDelete + ""; //Url aus meinem Inputfeld holen
        let player: string | string [] = url.query.spielername + "";


        //Pfad um Bilder aus Datenbank holen
        if (pathname == "/bilder") {
            let pictureData: MemoryKarten[] = await getPictures(urlDB);
            _response.write(JSON.stringify(pictureData));
        }

        //Pfad um alle Bilder auf der AdminSeite anzuzeigen
        else if (pathname == "/anzeigenBilder") {
            let anzeigen: MemoryKarten[] = await getPictures(urlDB);  
            _response.write(JSON.stringify(anzeigen));
        }

        //Pfad um auf der Adminseite ein Bild in die DB hinzuzufügen
        else if (pathname == "/hinzufuegen") {
            let memoryKarten: string = await addPictures (urlDB, memoryKarte);
            console.log(memoryKarten); //Zur Kontrolle
            _response.write(JSON.stringify(memoryKarten));
        }   

        //Pfad um auf der Adminseite ein Bild aus der Datenbank zu löschen
        else if (pathname == "/loeschen") {
            let memoryKarten: string = await deletePictures (urlDB, toDelete);
            _response.write(JSON.stringify(memoryKarten));
        }

        //Pfad 
        else if (pathname == "/score") {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true); //umwandlung query in assoziatives Array
            playTime =  Number(url.query.end) - Number(url.query.begin); //string in zahl umwandeln, voneinander abziehen und speichern
        }

        //Pfad um auf Spieleergebnisseite die Zeit anzuzeigen
        else if (pathname == "/playTime") {
            _response.write(JSON.stringify(playTime));
        }

        //Pfad um die ScoreDaten in DB zu speichern -->Button auf Spielergebnisseite (Bestätigen und senden)
        else if (pathname == "/abschickenScore") {
            console.log("abschicken Score");
            console.log(await saveHighscoreData(urlDB, player));
            
        }
        
        //Pfad für die 10 besten ScoreDaten anzeigen
         else if (pathname == "/anzeigenScore") {
            let anzeige: HighscoreDaten [] = await showScore(urlDB);
            _response.write(JSON.stringify(anzeige));
        }        
    }
    _response.end();
}// Ende Funktion Handle Request



//Funktion Bilder aus Datenbank auslesen/ holen
async function getPictures(_url: string): Promise <MemoryKarten[]> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    console.log(_url);

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    let cursor: Mongo.Cursor = infos.find(); //Suche der gesamten DB aber spezielle ist auch möglich mit .find({name: "..."})
    let result: MemoryKarten[] = await cursor.toArray(); //auslesen der kompletten DB
    return result;
}

//Funktion Bilder Löschen auf der Admin Seite
async function deletePictures (_url: string, _name: string | string[]): Promise<string> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    console.log(_name);
    infos.deleteOne({url: _name }); //ein Element mit dem Namen löschen (in DB heißt es url)

    return "Bild gelöscht";
}

//Funktion Bilder Hinzufügen auf der Admin Seite
async function addPictures (_url: string, _memoryKarte: MemoryKarten): Promise<string> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("MemoryKarten"); //Collection der MemoryKarten verwenden
    infos.insertOne(_memoryKarte); // ein Element hinzufügen und in DB speichern

    return "Bild hinzugefügt";
}
//Funktion Highscore Daten aus Spieleergebnisseite in DB speichern
async function saveHighscoreData(_url: string, _player: string | string[]): Promise<string> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("Highscore"); //Collection Highscore verwenden
    infos.insertOne ( { spielername: _player, zeit: playTime } ); //Element in Collection speichern mit den DB Elementen  
    return "Score hinzugefügt";
}

//Funktion Highscore auf Highscoreseite anzeigen
async function showScore(_url: string): Promise <HighscoreDaten[]> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    let infos: Mongo.Collection = mongoClient.db("Memory").collection("Highscore"); //Collection Highscore verwenden
    let cursor: Mongo.Cursor = infos.find(); //Suche der gesamten DB aber spezielle ist auch möglich mit .find({name: "..."})
    let result: HighscoreDaten[] = await cursor.toArray(); //auslesen der kompletten DB
    return result;   
}


//Interface für MemoryKarten
interface MemoryKarten {
    url: string;
}

//Interface für die HighscoreDaten
interface HighscoreDaten {
    spielername: string;
    zeit: number;
}
