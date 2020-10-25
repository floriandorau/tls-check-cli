const logger = require('./util/logger');

const { resolve } = require('path');
const { existsSync } = require('fs');
const { exec } = require('./util/cmd');

const { checkEndpoint } = require('./testssl');

const TESTSSL_FILE_PATH = resolve(__dirname, '..', 'lib', 'testssl');

const test = (url, options) => {
    try {
        logger.info(`Start testing ${url}`);
        checkEndpoint(url, options);
    } catch (err) {
        logger.error(`error while checking endpoint ${url}`, err);
    }
};

const check = () => {
    if (existsSync(TESTSSL_FILE_PATH)) {
        logger.info('testssl.sh exists. You can start using cli');
    } else {
        logger.info('testssl.sh not found. Make sure to run install command first');
    }
};

const install = () => {
    try {
        logger.info('Cloning latest version of testssl.sh');
        exec('git', ['clone', 'https://github.com/drwetter/testssl.sh.git', TESTSSL_FILE_PATH]);
    } catch (err) {
        logger.error('error while installing testssl', err);
    }
};

module.exports = { check, install, test };