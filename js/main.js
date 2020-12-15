"use strict";

var statusEndpoint = "https://status.cabbagecanfly.com/api/v1/"
var serverMap = {
    "mc.cabbagecanfly.com": "mc/vanilla",
    "ftb.cabbagecanfly.com": "mc/ftb",
    "dummy.cabbagecanfly.com": "mc/dummy"
}

function updateTableRow(tableRow, content) {
    if (content.online) {
        tableRow.className += " online";
        tableRow.querySelector(".server-icon img").src = content.icon;
        tableRow.querySelector(".motd").textContent = content.motd;
        tableRow.querySelector(".version").textContent = content.version;
        tableRow.querySelector(".players").textContent =
            content.players.online + "/" + content.players.max;
    } else {
        tableRow.className += " offline";
        tableRow.querySelector(".motd").textContent = "Server offline.";
    }
}

function getStatus(tableRow) {
    var address = tableRow.querySelector(".address").textContent.trim();
    var url = statusEndpoint + serverMap[address];
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var res = JSON.parse(xhr.responseText);
                updateTableRow(tableRow, res);
            } else {
                updateTableRow(tableRow, {});
            }
        }
    }
    xhr.send();
}

function getStatuses() {
    var tableRows = document.querySelector(".mc-status-table").querySelector("tbody").querySelectorAll("tr");
    tableRows.forEach(function(e) {
        getStatus(e);
    });
}

function main() {
    getStatuses();
}

window.addEventListener("DOMContentLoaded", main, false);
