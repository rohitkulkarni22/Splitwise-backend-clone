const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");

router.get('/', verify, (req, res) => {
    // Access currency information from req.user
  const { currency } = req.user;

  res.json({ message: 'Splitwise API live', currency });
});

module.exports = router;