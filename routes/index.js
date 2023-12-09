const express = require("express");
const router = express.Router();
const statement = require("../controller/index.js");

// POST /api/statement
router.post("/statement", statement);

module.exports = router;
