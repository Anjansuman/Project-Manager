import mongoose from "mongoose";

mongoose.connect("some url");

const userSchema = new mongoose.Schema({
    usename: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (value: string) => {
                return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value);
            },
            message: "Imvalid email format"
        }
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
    } 

});

export const userModel = new mongoose.Model("user", userSchema);