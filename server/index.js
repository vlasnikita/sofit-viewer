const express = require('express');
const cors = require('cors');
const port = 3001;

const { getTraces, getTracefilePath, purifyTraceJson } = require('./utils.js');

const app = express();

app.use(cors());

app.get('/traces', (req, res) => {
    res.send(getTraces());
})
app.get('/traces/:traceId/image', (req, res) => {
    res.sendFile(getTracefilePath(req.params.traceId, 'image'));
})
app.get('/traces/:traceId/json', (req, res) => {
    const traceJsonRaw = require(getTracefilePath(req.params.traceId, 'json'));
    const traceJson = purifyTraceJson(traceJsonRaw);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(traceJson));
})

app.listen(port, () => {
  console.log(`sofit-viewer-server listening on port ${port}`);
})