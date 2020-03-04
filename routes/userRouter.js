const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();
/**
 * @swagger
 *
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - name
 *       - password
 *       - passwordConfirm
 *       - email
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       passwordConfirm:
 *         type: string
 *         format: password
 *   User:
 *     allOf:
 *       - $ref: '#/definitions/NewUser'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
 */

/**
 * @swagger
 * /v1/users/signup/:
 *  post:
 *    tags:
 *    - "signup"
 *    summary: "Add a new user to the application"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/json"
 *    parameters:
 *      - name: NewUser
 *        schema:
 *           $ref: '#/definitions/NewUser'
 *    responses:
 *      201:
 *        description: "user created succefully"
 *      405:
 *        description: "Invalid input"
 */

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

router.patch(
  '/updatepassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/updateMe', authController.protect, userController.deleteMe);

module.exports = router;
