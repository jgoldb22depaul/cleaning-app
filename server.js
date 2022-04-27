const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const connectHistory = require('connect-history-api-fallback')
app = express();
app.use(connectHistory())
app.use(serveStatic(path.join(__dirname, '/dist')));
const port = process.env.PORT || 8080;
app.listen(port);