const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const authCheck = require("../middleware/authCheck");
const accountController = require("../controllers/accountController");

router.get("/balance", authCheck, accountController.getAccountBalance);
router.get("/transfer", authCheck, accountController.accountBalanceTransfer);
module.exports = router;

