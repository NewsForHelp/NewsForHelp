var ApplianceStatus = (function() {

    // constructor
    function ApplianceStatus() {
        this.status = true;
    }

    ApplianceStatus.prototype.isErrorStatus = function() {
        return this.status == null;
    };

    ApplianceStatus.prototype.setUsualStatus = function() {
        this.status = true;
    };

    ApplianceStatus.prototype.setErrorStatus = function() {
        this.status = null;
    };

    return ApplianceStatus;
})();

var ApplianceSetting = (function() {

    // constructor
    function ApplianceSetting(statusDefualtImage,statusAlertImage,soundFile) {
        this.statusDefualtImage = statusDefualtImage;
        this.statusAlertImage = statusAlertImage;
        this.soundFile = soundFile;
    }

    ApplianceSetting.prototype.getStatusDefualtImage = function() {
        return this.statusDefualtImage;
    };

    ApplianceSetting.prototype.getStatusAlertImage = function() {
        return this.statusAlertImage;
    };

    ApplianceSetting.prototype.getSoundFile = function() {
        return this.soundFile;
    };

    return ApplianceSetting;
})();
