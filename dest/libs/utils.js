/**
 * Created by DTuzenkov on 10/23/14.
 */
/**
 * Utils for our app
 */

define(['underscore'], function (_) {
    var Utils = {};

    Utils.isMobileDevice = function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    };

    return Utils;
});