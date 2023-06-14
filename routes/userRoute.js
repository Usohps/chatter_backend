const express = require("express")
const router = express.Router()
const {signUp,validate,login} = require("../controllers/userController")
router.post("/signup",validate("signup"),signUp)
router.post("/login", validate("login"),login)

module.exports = router
