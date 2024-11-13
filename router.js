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

router.get('/all-projects',jwtmiddleware,projectController.getAllProjectController)

router.get('/home-projects',projectController.getHomeProjectController)

router.get('/user-projects',jwtmiddleware,projectController.getUserProjectController)

router.delete('/remove-userproject/:id',jwtmiddleware,projectController.removeUserProjectController)

router.put('/update-userProject/:id',jwtmiddleware,multerConfig.single('projectImage'),projectController.editProjectController)

router.put('/update-userProfile',jwtmiddleware,multerConfig.single("profile"),userController.editProfileController)
module.exports = router