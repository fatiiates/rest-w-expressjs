import express from 'express';
import App from './app';
import FileController from './src/controller/file/file.controller';
import UserController from './src/controller/user/user.controller';

import uploadFileMiddleware from './src/middleware/user/upload/upload';

// Create the Express app
const app = new App({
    port: 8080,
    controllers: [
        new FileController(),
        new UserController(),
    ],
    middleWares: [
      express.json(),
      express.urlencoded({ extended: true }),
      uploadFileMiddleware,
    ]
})

// Starts Express App on port: 8080
app.listen()
