const logger = require('./util/logger');

const { resolve } = require('path');
const { existsSync, rmSync } = require('fs');
const { exec } = require('./util/cmd');

const { checkEndpoint } = require('./testssl');

const TESTSSL_FILE_PATH = resolve(__dirname, '..', 'lib', 'testssl');
const TESTSSL_VERSION = '3.2';

const test = (url, { severity, format, file, verbose }) => {
    logger.init({ debug: verbose });

    try {
        logger.info(`Start testing ${url}`);
        checkEndpoint(url, { severity, format, file });
    } catch (err) {
        logger.error(`error while checking endpoint ${url}`, err);
    }
};

const check = ({ verbose = false }) => {
    logger.init({ debug: verbose });

    if (existsSync(TESTSSL_FILE_PATH)) {
        logger.info('testssl.sh exists. You can start using cli');
    } else {
        logger.info('testssl.sh not found. Make sure to run install command first');
    }
};

const install = ({ verbose = false }) => {
    logger.init({ debug: verbose });

    try {
        if (existsSync(TESTSSL_FILE_PATH)) {
            logger.info('Removing former version of testssl.sh');
            rmSync(TESTSSL_FILE_PATH, { recursive: true, maxRetries: 2 });
        }

        logger.info(`Installing testssl.sh with version ${TESTSSL_VERSION} ...`);
        exec('git', ['clone', '--depth', '1', 'https://github.com/testssl/testssl.sh.git', '--branch', TESTSSL_VERSION, TESTSSL_FILE_PATH]);
    } catch (err) {
        logger.error('error while installing testssl', err);
    }
};

module.exports = { check, install, test };