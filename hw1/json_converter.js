'use strict';

const assert = require('assert');
const fs = require('fs');

function onEachElm(accumulator, valueObj) {
    let keysArr = Object.keys(valueObj).sort();
    let thisElm = [];
    keysArr.forEach(keyName => {
        thisElm.push(valueObj[keyName]);
    });
    accumulator.push(thisElm);
    return accumulator;
}

function runOnLoad(cmdLine) {
    assert(cmdLine.length == 3, "Incorrect number of cmdLine args");
    let inputFileName = cmdLine[2];
    let origJsonData = require(inputFileName);
    console.log("Original data loaded from", inputFileName);
    let arrayJsonData = origJsonData.reduce(onEachElm, []);
    assert(origJsonData.length == arrayJsonData.length, "Conversion incomplete!");
    console.log("Conversion completed for records #", arrayJsonData.length);
    let outputFileName = "ucsd_common_converted.json";
    fs.writeFileSync(outputFileName, JSON.stringify(arrayJsonData));
    console.log("Converted JSON data written to", outputFileName);
    return;
}

runOnLoad(process.argv);
