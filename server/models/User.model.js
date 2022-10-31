const mongooseDelete = require("mongoose-delete");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String, unique: true, require: true,},
    fullname: {type: String, require: true,},
    password: {type: String, minlength: 6,require: true,},
    email: {type: String, unique: true},
    phone_number: {type: String, unique: true,require: false,},
    country: {type: String,require: true,},
    admin: {type: Boolean, default: "false",require: true}
    }, 
    {timestamps: true}
)

const User = mongoose.model("user", UserSchema);

module.exports = User;