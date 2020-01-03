'use strict';
const LOG_LINE_SEPARATOR = '<br>';

module.exports = class loggertomemory {
    constructor(logsEnabled, logMaxLength, outToConsole) {
        this._log = ["raulcalvo/ocr online _log system" + LOG_LINE_SEPARATOR];
        this._logNumber = 0;
        this._logsEnabled = logsEnabled;
        this._logMaxLength = logMaxLength;
        this._outToConsole = outToConsole;
    }

    log(out) {
        if (!this._logsEnabled)
            return;
        if (this._log.length > this._logMaxLength)
            this._log.splice(1, 1);
        const dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var log = "[" + ++this._logNumber + "][" + dateTime + "] " + out;
        this._log.push(log);
        if ( this._outToConsole)
            console.log(log);
    }

    get() {
        var out = "";
        this._log.forEach(value => {
            out += value + LOG_LINE_SEPARATOR;
        });
        return out;
    }
}
 