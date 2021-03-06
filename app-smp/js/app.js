var server = null;
var port = 8080;
var appRoot = './public';
var applianceStatus = null;
var ngSound = null;
var washerSetting = new ApplianceSetting('./img/laundry_default.jpg', './img/laundry_alert.jpg', 'sounds/laundry_alert_sound.mp3')
var stoveSetting = new ApplianceSetting('./img/pod_default.jpg', './img/pod_alert.jpg', 'sounds/pod_alert_sound.mp3')

// 洗濯機とコンロの切り替え
var applianceSetting = washerSetting;
//var applianceSetting = stoveSetting;

function init() {
    console.log("load start");

    applianceStatus = new ApplianceStatus();

    startServer();

    setStatusButtonAttribute();

    console.log("load complete");
}

function startServer() {
    server = new HttpServer();
    server.get("/", appRoot);
    server.get("/xhr", function xhrres(req, res, oncomplete) {
        console.log(req);
        var ret = applianceStatus.isErrorStatus() ? 'NG' : 'OK';
        res.write(ret); // not send?
        oncomplete();
    });
    server.start(port);

    var msg = 'Running on ' + server._host + ':' + port;

    console.log(msg);

    document.getElementById("port").innerHTML=msg;
}

function setStatusButtonAttribute() {
    var statusButton = document.getElementById("status-button");

    statusButton.style.backgroundImage = "url(" + applianceSetting.getStatusDefualtImage() +")";

    statusButton.addEventListener("click", function (e) {
        if (applianceStatus.isErrorStatus()) {
            statusButton.style.backgroundImage = "url(" + applianceSetting.getStatusDefualtImage() +")";

            pauseSound();

            applianceStatus.setUsualStatus();
        } else {
            statusButton.style.backgroundImage = "url(" + applianceSetting.getStatusAlertImage() +")";

            var soundFile = applianceSetting.getSoundFile();
            if(soundFile != null && soundFile != '' ) {
                playSound(soundFile);
            }

            applianceStatus.setErrorStatus();
        }
    } , false );
}

function playSound(soundFile) {
    ngSound = new Audio(soundFile);
    ngSound.loop = false;
    ngSound.play();
}

function pauseSound() {
    if(ngSound != null) {
        ngSound.pause();
        ngSound = null;
    }
}

window.addEventListener('load', init);
