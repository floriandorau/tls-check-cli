const logger = require('./logger');

const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');

const ifNotExists = function (path, callback) {
    if (!existsSync(path)) {
        callback();
    }
};

const createIfNotExist = function (...pathParts) {
    logger.debug(`Check if path '${pathParts}' exists`);

    let buildedPath = '';
    pathParts.forEach(part => {
        buildedPath = join(buildedPath, part);

        ifNotExists(buildedPath, () => {
            logger.debug(`Path ${buildedPath} not exists, though creating new`);
            mkdirSync(buildedPath);
        });
    });

    return buildedPath;

};

module.exports = { createIfNotExist };