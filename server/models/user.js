const mongoose=require("../config/dbConnect");

const bcrypt=require("bcrypt");
const SALT=10;

let userSchema = mongoose.Schema({
	username:{
       type:String,
       unique:true
    },
    email:{
        type:String,
        unique:true
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        default: "user",
    },
    password:String
},{
    timestamps: true,
});

userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

let UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;