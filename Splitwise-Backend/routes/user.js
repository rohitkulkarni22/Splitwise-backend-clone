const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

// router.get('/', (req, res) => {
//     return res.send("hi");
// });

// Signup 
router.post('/signup', handleUserSignup);
// login 
router.post('/login', handleUserLogin);


module.exports = router;