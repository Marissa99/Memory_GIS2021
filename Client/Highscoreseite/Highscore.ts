
let nameCollection: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>> document.getElementsByClassName("playerName"); //Element um auf HTML anzuzeigen
let timeCollection: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>> document.getElementsByClassName("time"); //Element um auf HTML anzuzeigen

showScore();
//Funktion um die 10 Besten Score Daten anzuzeigen
async function showScore(): Promise <void> {
    let form: FormData = new FormData(document.forms[0]);
    //let url: string = "http://localhost:8100";
    let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/anzeigenScore" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe:  HighscoreDaten[] = await response.json();

    //Alle Score Daten sortieren (von kurzer nach langer Spieldauer) 
    ausgabe.sort((a, b) => a.zeit - b.zeit); // Sorteren der DB nach Zeit https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    for (let i: number = 0; i < 10; i++) { //Array durchgehen und 10 besten anzeigen
        nameCollection[i].innerText = "Name: " + ausgabe[i].spielername;
        timeCollection[i].innerText = "Dauer: " + (ausgabe[i].zeit).toString() + " Sekunden";
    }    
}


//Interface für die HighscoreDaten
interface HighscoreDaten {
    spielername: string;
    zeit: number;
}