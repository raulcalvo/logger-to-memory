'use strict';
const requirer = require("extended-requirer");
const r = new requirer(__dirname);

const path = require('path');
const fs = require('fs');
const mergeJSON = require('merge-json');

const configLoader = r.require('config-loader-manager');

function getModuleName(){
    return __dirname.split(path.sep).slice(-1)[0];
}

module.exports = class logger {
    constructor(config) {
        var defaultConfig = {};
        defaultConfig[getModuleName()] = {
            "logsEnabled" : true,       // If false logs won't do anything
            "maxLogLines" : 20,         // Max number of lines/entrys in memory log
            "logToConsole" : true,      // Log also to console.log("Some log")
            "lineSeparator" : "<br>",   // Line separator when output logs with get function
            "firstLogLine" : "raulcalvo/logger-to-memory logs:"
        };
        this._config = configLoader.load(__dirname, config, defaultConfig);
        this._log = [ this.getConfig("firstLogLine")];
        this._logNumber = 0;
    }

    getConfig(key){
        return this._config[getModuleName()][key];
    }
    log(out) {
        if (!this.getConfig("logsEnabled"))
            return;
        if (this._log.length > this.getConfig("maxLogLines"))
            this._log.splice(1, 1);
        const dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var log = "[" + ++this._logNumber + "][" + dateTime + "] " + out;
        this._log.push(log);
        if ( this.getConfig("logToConsole"))
            console.log(log);
    }

    get() {
        var out = "";
        this._log.forEach(value => {
            out += value + this.getConfig("lineSeparator");
        });
        return out;
    }
}
 