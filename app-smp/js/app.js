var server = null;
var port = 80;
var appRoot = './public';
var applianceStatus = null;
//var statusDefualtImage = './img/pod_default.jpg';
//var statusAlertImage = './img/pod_alert.jpg';
var statusDefualtImage = './img/laundry_default.jpg';
var statusAlertImage = './img/laundry_alert.jpg';

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

    statusButton.style.backgroundImage = "url(" + statusDefualtImage +")";

    statusButton.addEventListener("click", function (e) {
        if (applianceStatus.isErrorStatus()) {
            statusButton.style.backgroundImage = "url(" + statusDefualtImage +")";
            applianceStatus.setUsualStatus();
        } else {
            statusButton.style.backgroundImage = "url(" + statusAlertImage +")";
            applianceStatus.setErrorStatus();
        }
    } , false );    
}

window.addEventListener('load', init);
