let debugEnabled = false;

exports.init = function ({ debug = false }) {
    debugEnabled = debug;
};

exports.info = function (message) {
    console.log(message);
};

exports.error = function (message, err) {
    console.error(message);
    if (err) {
        console.error(err);
    }
};

exports.debug = function (message) {
    if (debugEnabled) {
        console.log(message);
    }
};