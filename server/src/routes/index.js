const path = require('path');
const express = require('express');

const route = (app) => {
    app.use('/public', express.static('public/uploads'));
    app.use('/user', require('./userRouter'));
    app.use('/admin', require('./adminRouter'));
    app.use('/api', require('./categoryRouter'));
    app.use('/api', require('./productRouter'));
    app.use('/api', require('./cartRouter'));
}

module.exports = route;