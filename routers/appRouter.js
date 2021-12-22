const express = require('express');
const appRouter = express.Router();

const userRouter = require('./userRouter');

appRouter.use('/users', userRouter);
appRouter.user('/groups', groupRouters)


module.exports = appRouter;