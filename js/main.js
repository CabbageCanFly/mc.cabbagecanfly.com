"use strict";

function main() {
    console.log("!");
    var url = "https://status.cabbagecanfly.com/api/v1/mc/vanilla"
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var res = JSON.parse(xhr.responseText);
                console.log(res);
            }
        }
    }
    xhr.send();
}

window.addEventListener("DOMContentLoaded", main, false);