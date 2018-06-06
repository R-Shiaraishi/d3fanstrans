'user strict'

var legs = {};
// 装備リスト
(function () {
    var file = 'legendaries.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL(file), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            legs = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
})();

// 装備
let items = document.getElementsByClassName('build-item');
for (let item of items) {
    let textNode = item.firstChild;
    if (textNode == null) continue;

    let match = legs.find(function (pair) {
        return pair.en == textNode.nodeValue;
    })

    if (match != null) textNode.nodeValue = match.jp;
}

// カナイのキューブ
let kanais = (function () {
    let weapon = document.getElementById('kanai-weapon');
    let armor = document.getElementById('kanai-armor');
    let jewelry = document.getElementById('kanai-jewelry');

    return [weapon, armor, jewelry];
})();

for (let kanai of kanais){
    let span = kanai.lastElementChild;

    let match = legs.find(function (pair) {
        return pair.en == span.textContent;
    })

    if (match != null) span.textContent = match.jp;
}