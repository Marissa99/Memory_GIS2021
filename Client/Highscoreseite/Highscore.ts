


let nameCollection: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>> document.getElementsByClassName("playerName");
let timeCollection: HTMLCollectionOf<HTMLParagraphElement> = <HTMLCollectionOf<HTMLParagraphElement>> document.getElementsByClassName("time");

showScore();
//Funktion um die 10 Besten Score Daten anzuzeigen
async function showScore(): Promise <void> {
    let form: FormData = new FormData(document.forms[0]);
    let url: string = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query: URLSearchParams = new URLSearchParams(<any>form);
    url = url + "/anzeigenScore" + "?" + query.toString();
    let response: Response = await fetch(url);
    let ausgabe:  HighscoreDaten[] = await response.json();

    //Alle Score Daten sortieren (kurze nach lange Spieldauer) 
    ausgabe.sort((a, b) => a.zeit - b.zeit); // Sorteren der DB nach Zeit https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    for (let i: number = 0; i < 10; i++) { //Array durchgehen und alle anzeigen
        nameCollection[i].innerText = "Name: " + ausgabe[i].spielername;
        timeCollection[i].innerText = "Dauer: " + (ausgabe[i].zeit / 1000).toString() + " Sekunden";
    }    
}
// //Funktion um die 10 Besten Score Daten anzuzeigen
// async function showScore(): Promise <void> {
//     let form: FormData = new FormData(document.forms[0]);
//     let url: string = "http://localhost:8100";
//     //let url: string = "https://gissose2021mr.herokuapp.com";
//     //--> motzt wegen any nicht mehr
//     //tslint:disable-next-line 
//     let query: URLSearchParams = new URLSearchParams(<any>form);
//     url = url + "/anzeigenScore" + "?" + query.toString();
//     let response: Response = await fetch(url);
//     let ausgabe:  HighscoreDaten[] = await response.json();
//     console.log(ausgabe);

//     //Alle Score Daten sortieren (kurze nach lange Spieldauer) 
//     ausgabe.sort((a, b) => a.zeit - b.zeit); // Sorteren der DB nach Zeit https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

//     //um dann die 10 Besten raussuchen und ausgeben zu können -->for Schleife 
//     let anzeigeDiv: HTMLDivElement = <HTMLDivElement> document.getElementById("Highscore"); 
//     anzeigeDiv.innerHTML = ""; // um es immer zu aktualisieren muss es geleert werden
    
//     for (let i: number = 0; i < 10; i++) { //Array durchgehen und alle anzeigen
//         let div: HTMLDivElement = showHighscore(ausgabe[i]); //Aufgruf der Funktion mit Übergabe der
//         anzeigeDiv.appendChild(div);
//     }    
// }

// function showHighscore (_highscore: HighscoreDaten): HTMLDivElement {
//     let score: HTMLDivElement = document.createElement("div");
//     score.classList.add("Score"); //https://developer.mozilla.org/de/docs/Web/API/Element/classList

//     let name: HTMLParagraphElement = document.createElement("p"); //Um die Urls zu den Bildern zu sehen
//     name.innerText = _highscore.spielername;
//     score.appendChild(name);

//     let zeit: HTMLParagraphElement = document.createElement("p"); //Um die Urls zu den Bildern zu sehen
//     zeit.innerText = _highscore.zeit.toString();
//     score.appendChild(zeit);

//     return score; // Rückgabewert damit DivElement akzepiert wird

// }

//Interface für die HighscoreDaten
interface HighscoreDaten {
    spielername: string;
    zeit: number;
}