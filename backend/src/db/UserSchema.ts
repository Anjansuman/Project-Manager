import mongoose from "mongoose";

mongoose.connect("some url");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
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

export const UserModel = mongoose.model("Users", UserSchema);