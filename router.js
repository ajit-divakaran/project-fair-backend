// import express
const express = require('express')
// import userController
const userController = require('./controllers/userController')

const projectController = require('./controllers/projectController')

const jwtmiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

// instance router

const router = new express.Router()

//Register

router.post('/register',userController.register)
//login
router.post('/login',userController.login)


//add project
router.post('/add-project',jwtmiddleware,multerConfig.single("projectImage"),projectController.addProjectController)

router.get('/all-projects',projectController.getAllProjectController)

router.get('/home-projects',projectController.getHomeProjectController)

router.get('/user-projects',projectController.getUserProjectController)

module.exports = router