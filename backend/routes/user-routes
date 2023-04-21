const express = require('express');
const userControllers = require('../controllers/user-controllers');
const router = express.Router();


router.post("/adduser", userControllers.addUser);
router.get("/getusers", userControllers.getUsers);
router.post("/deleteuser", userControllers.deleteUser);

module.exports = router;