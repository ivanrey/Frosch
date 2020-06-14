if (typeof require !== 'undefined') {
    var fs = require('fs');
    var homeOrTmp = require('home-or-tmp');

    window.onerror = function (errorMsg, url, lineNumber, colNumber) {

        var now = new Date();
        var mensaje = now.toString() + ' ' + errorMsg + '@' + url + ':' + lineNumber + '.' + colNumber;
        fs.appendFile(homeOrTmp + '/errores.txt', mensaje);
    };
}