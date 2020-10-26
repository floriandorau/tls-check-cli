const cmd = require('./util/cmd');
const { createIfNotExist } = require('./util/dir');
const { join } = require('path');
const logger = require('./util/logger');

const TESTSSL_FILE_PATH = join(__dirname, '..', 'lib', 'testssl', 'testssl.sh');

const _checkEndpoint = function (endpointUrl, { severity, jsonPath, htmlPath, logPath }) {
    logger.info(`Checking endpoint '${endpointUrl.href}'`);

    let args = [TESTSSL_FILE_PATH];

    if (severity) {
        args = [...args, '--severity', severity];
    }

    if (jsonPath) {
        args = [...args, '--jsonfile', jsonPath];
    }
    if (htmlPath) {
        args = [...args, '--htmlfile', htmlPath];
    }
    if (logPath) {
        args = [...args, '--logfile', logPath];
    }

    logger.debug(`Running testssl with args: ${args.join(', ')}`);

    return cmd.exec('bash', [...args, endpointUrl.href])
        .catch(err => logger.error(`Error while checking endpoint '${endpointUrl.href}'`, err));
};

exports.checkEndpoint = function (url, { severity, format }) {
    logger.info(`Running ssl endpoint check for '${url}'`);

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }

    const endpointUrl = new URL(url);
    let testsslArgs = {};

    if (severity) {
        testsslArgs.severity = severity.toUpperCase();
    }

    switch (format) {
        case 'html':
            testsslArgs.htmlPath = createIfNotExist(__dirname, '..', 'output', 'html');
            break;
        case 'json':
            testsslArgs.jsonPath = createIfNotExist(__dirname, '..', 'output', 'json');
            break;
        case 'csv':
            testsslArgs.csvPath = createIfNotExist(__dirname, '..', 'output', 'csv');
            break;
        case 'log':
            testsslArgs.logPath = createIfNotExist(__dirname, '..', 'output', 'log');
            break;
    }

    return _checkEndpoint(endpointUrl, testsslArgs);
};