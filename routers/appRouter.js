const express = require('express');
const appRouter = express.Router();

const userRouter = require('./userRouter');
const groupRouter = require('./groupRouter');

appRouter.use('/users', userRouter);
appRouter.use('/groups', groupRouter);


module.exports = appRouter;