var pattern = /^[a-zA-Z]{2,50}$/mg;

var dictAudio = document.createElement('audio');
dictAudio.style.display = 'none';
dictAudio.setAttribute('volume', 1);

window.addEventListener('load', function() {
    document.body.appendChild(dictAudio);
});

window.addEventListener('mouseup', function() {
    var text = encodeURIComponent(window.getSelection());
    text = text.replace(/\s/mg, "");
    if (!pattern.test(text)) return;
    var oReq = new XMLHttpRequest();
    oReq.responseType = "document";
    oReq.onload = function() {
        var result = oReq.responseXML.querySelector('acceptation');
        var audio = oReq.responseXML.querySelector('pron');
        if (result) {
            console.log(result.innerHTML);
            if (audio) {
                dictAudio.setAttribute('src', audio.innerHTML);
                dictAudio.play();
            }
        } else {
            console.log('not found');
        }
    };
    oReq.open("get", 'http://dict-co.iciba.com/api/dictionary.php?key=277E4942EF0F80880C1BC1D562797AF7&w=' + text.toLowerCase());
    oReq.send();
});
