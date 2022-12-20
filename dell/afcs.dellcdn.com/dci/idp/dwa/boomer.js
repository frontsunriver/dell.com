(function () {
    'use strict';
    if (window.BOOMR) {
        BOOMR.init({
            beacon_url: environment == "Prod" ? "https://boomerang.dell.com/api/beacon" : "https://sit-boomerang-api-core.ausmpc01.pcf.dell.com/api/beacon",
            applicationInfo: {
                getAppId: function getAppId() {
                    return "di_dwa";
                },
                getServerName: function getServerName() {
                    return "server";
                },
                getUserObj: function getUserObj() {
                    var userObj = localeData;
                    return userObj;
                }
            }
        });
    }
})();