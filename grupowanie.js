// ==UserScript==
// @name         Grupowanie
// @namespace    http://tampermonkey.net/
// @version      0.01
// @description  ...
// @author       Mlynar
// @match        https://*.plemiona.pl/game.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=plemiona.pl
// @grant        none
// ==/UserScript==


javascript:

if (window.location.href.indexOf("screen=overview_villages&&mode=groups") < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "/game.php?*&screen=overview_villages&&mode=groups&type=static");
}

const villageListHelp = document.getElementById("group_assign_table");
const villageList = villageListHelp.querySelectorAll("tr.row_a, tr.row_b");
const groupSelect = villageListHelp.nextElementSibling;

const content = `<div id="content-window">
    <input id="cord-input" style="height:100px; width:200px"></input>
    <button id="start-grouping">Start</button>
    </div>`

function createWindow() {
    document.querySelector("#overview_menu").innerHTML += content;
}

createWindow();

function handleClick(){
    const input = document.getElementById("cord-input").value;
    const cordList = input.split(" ");

    cordList.forEach((cord) => {
        for(let a = 0; a < villageList.length; a++){
            let path = villageList[a].childNodes[1].childNodes[3].childNodes[1].childNodes[1].innerText.includes(cord);
            console.log(path);
            if(path === true) {
                villageList[a].childNodes[1].childNodes[1].checked = true;
            }
        }
});
    UI.InfoMessage("Zaznaczone",500,"success")
}

document.getElementById("start-grouping").addEventListener("click", handleClick);