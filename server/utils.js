const path = require("path");
const fs = require("fs");
const storage = "./storage"


function getTraces() {
    const traces = [];
    fs.readdirSync(storage).forEach(trace => {
        traces.push(trace);
    });
    return traces;
}

function getTracefilePath(traceId, fileType) {
    const fileName = fileType === 'image' ? 'debug.jpg' : 'trace.json';
    return path.join(__dirname, storage, traceId, fileName);
}

function purifyTraceJson(jsonRaw) {
    return jsonRaw.history.tracks[0].points;
}

module.exports = {
    getTraces, getTracefilePath, purifyTraceJson
}