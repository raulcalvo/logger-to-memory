'use strict';
global.__basedir = __dirname;

const requirer = require("extended-requirer");
const r = new requirer(__dirname,{"currentConfig" : "PRO"});

const logger = require("./index.js");

var loggerConfig = {
    "logger-to-memory" :{
        "logsEnabled": true,
        "maxLogLines": 20,
        "logToConsole": true,
        "lineSeparator": "\n"
    }
};
var l = new logger(loggerConfig);

l.log("Test de logs");
l.log("Prueba 1");
l.log("Prueba 2");
console.log(l.get());
