const { validationResult } = require("express-validator")
const User = require("../models/user")
const jwt = require("jsonwebtoken")


exports.signup = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }

    const user = new User(req.body)
    user.save(
        (err, user) => {
            if (err) {
                return res.status(400).json({ error: "Unable to add user" })
            }

            return res.json({ user })
        })
}


exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: "email not found" })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({ error: "email & password do not match" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET)

        res.cookie("token", token, { expire: new Date() + 1, httpOnly: true })


        const { _id, fname, lname, email } = user

        return res.json({
            token,
            user: { _id, fname, lname, email }
        })
    })

}

exports.signout = (req, res) => {
    res.clearCookie("token")
    return res.json({ message: "user signout successful" })
}