const logger = require('./logger');

const { spawn } = require('child_process');

exports.exec = (cmd, args) => {
    const spawnedProcess = spawn(cmd, args);
    spawnedProcess.stdout.pipe(process.stdout);
    spawnedProcess.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
        process.on('error', err => {
            logger.error('Process exited with error', err);
            reject(err);
        });

        process.on('exit', (code, signal) => {
            logger.debug(`Process exited with code ${code} and signal ${signal}`);
            resolve();
        });
    });
};