"use strict";
let buttonEnfernen = document.getElementById("Loeschen");
buttonEnfernen.addEventListener("click", clickRemovePicture);
//Funktion um Bild entfernen zu können
async function clickRemovePicture() {
    let form = new FormData(document.forms[0]);
    let url = "http://localhost:8100";
    //let url: string = "https://gissose2021mr.herokuapp.com";
    //--> motzt wegen any nicht mehr
    //tslint:disable-next-line 
    let query = new URLSearchParams(form);
    url = url + "/entfernen" + "?" + query.toString();
    let response = await fetch(url);
    let ausgabe = await response.text();
    //let serverA: HTMLElement = <HTMLElement>document.getElementById("datenbank");
    //serverA.innerHTML = ausgabe;
}
//# sourceMappingURL=Admin.js.map