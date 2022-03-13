const express = require("express")
const { check } = require("express-validator")
const { signup, signin, signout } = require("../controllers/user")
const router = express.Router()


router.post("/signup", [
    check ("fname", "First Name should be atleast 3 characters").isLength({ min: 3 }),
    check ("lname", "Last Name should be atleast 3 characters").isLength({ min: 3 }),
    check ("email", "Invalid email").isEmail(),
    check ("password", "Password should be atleast 6 characters").isLength({ min: 6 }),
], signup)


router.post("/signin", signin)

router.get("/signout", signout)


module.exports = router