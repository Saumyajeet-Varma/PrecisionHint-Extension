import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit"
import { generateHints } from "./gemini.js"

dotenv.config();

const app = express();

const limiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS || 24 * 60 * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX || 50,
    message: process.env.RATE_LIMIT_MESSAGE || "Too many requests from this IP"
});

app.use(cors());
app.use(express.json());
app.use(limiter)

app.get("/", (req, res) => {
    res.send("Server is Running...");
});

app.get("/get-hint", async (req, res) => {

    try {
        const { problem } = req.query;

        if (!problem) {
            return res.status(400).json({ success: false, error: 'Missing problem parameter' });
        }

        const hints = await generateHints(problem);

        if (!hints) {
            return res.status(500).json({ success: false, error: "Problem in generating hints" });
        }

        return res.status(200).json({ success: true, hints });
    }
    catch (err) {
        console.error('Error in /get-hint:', err);
        return res.status(500).json({ success: false, error: 'Server error' });
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});