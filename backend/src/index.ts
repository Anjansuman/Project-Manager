import express from "express";
import { userMiddleware } from "./middleware/userMiddleware";

const app = express();
app.use(express.json());

app.post("/eject/v1/signup", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.post("/eject/v1/signin", (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

app.post("/eject/v1/dashboard", userMiddleware, (req, res) => {
    try {
        
    } catch (error) {
        
    }
})
