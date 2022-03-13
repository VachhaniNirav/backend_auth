const mongoose = require("mongoose")
const crypto = require("crypto")
const uuid = require ("uuid")


const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },

    lname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    encry_pwd: {
        type: String,
        required: true,
    },

    salt: String,
    
}, { timestamps: true })



userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuid.v1()
        this.encry_pwd = this.securePwd(password)
    })

    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainpwd) {
        return this.securePwd(plainpwd) === this.encry_pwd
    },

    securePwd: function (plainpwd) {
        if (!plainpwd) return ""

        try {
            return crypto.createHmac("sha256", this.salt).update(plainpwd).digest("hex")
        } catch (err) {
            return ""
        }
    }
}


module.exports = mongoose.model("user", userSchema)