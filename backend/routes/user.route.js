const express = require('express');
const {registerUser, getAllUsers,getUserById} = require('../controllers/user.controller')

const userRouter = express.Router();

// @route   POST /users/register
userRouter.post('/users/register', registerUser);

// @route   GET /users
userRouter.get('/users', getAllUsers);

// @route   GET /users/:id
userRouter.get('/users/:id', getUserById);

module.exports = userRouter
