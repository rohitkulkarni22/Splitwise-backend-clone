const express = require("express");
const app = express();

const logRequest = (req, res, next) => {
    const requestTime = new Date();
    const method = req.method;
    const url = req.url;
    console.log(`${requestTime} ${method}: ${url}`);
    next();
};


module.exports = logRequest;
