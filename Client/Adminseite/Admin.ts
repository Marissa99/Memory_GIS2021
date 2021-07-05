
let buttonEnfernen: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Loeschen");
buttonEnfernen.addEventListener("click", clickRemovePicture);

//Funktion um Bild entfernen zu können
    async function clickRemovePicture(): Promise<void> {
        let form: FormData = new FormData(document.forms[0]);
        let url: string = "http://localhost:8100";
        //let url: string = "https://gissose2021mr.herokuapp.com";
        //--> motzt wegen any nicht mehr
        //tslint:disable-next-line 
        let query: URLSearchParams = new URLSearchParams(<any>form);
        url = url + "/entfernen" + "?" + query.toString();
        let response: Response = await fetch(url);
        let ausgabe: string = await response.text();
        console.log(ausgabe);

       //let serverA: HTMLElement = <HTMLElement>document.getElementById("datenbank");
        //serverA.innerHTML = ausgabe;
    }