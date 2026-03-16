import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors()); // allow your front-end to access
app.use(express.json());

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

app.post("/exchange_token", async (req, res) => {
    const { code, code_verifier } = req.body;

    try {
        const params = new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
            code_verifier: code_verifier
        });

        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            params.toString(),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        // Send token info back to front-end
        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to exchange token" });
    }
});

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));