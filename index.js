'use strict';
const fs = require('fs');
const mergeJSON = require('merge-json');

module.exports = class logger {
    constructor(config) {
        var defaultConfig = {
            "logsEnabled" : true,   // If false logs won't do anything
            "maxLogLines" : 20,     // Max number of lines/entrys in memory log
            "logToConsole" : true,  // Log also to console.log("Some log")
            "lineSeparator" : "<br>"// Line separator when output logs with get function
        };
        this._c = mergeJSON.merge(defaultConfig, config);
        this._log = ["raulcalvo/ocr online _log system" + this._c.lineSeparator];
        this._logNumber = 0;
    }

    log(out) {
        if (!this._c.logsEnabled)
            return;
        if (this._log.length > this._c.maxLogLines)
            this._log.splice(1, 1);
        const dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var log = "[" + ++this._logNumber + "][" + dateTime + "] " + out;
        this._log.push(log);
        if ( this._c.logToConsole)
            console.log(log);
    }

    get() {
        var out = "";
        this._log.forEach(value => {
            out += value + this._c.lineSeparator;
        });
        return out;
    }
}
 