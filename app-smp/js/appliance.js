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

