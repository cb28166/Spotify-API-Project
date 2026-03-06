const clientId = "e346aa5709f44eda9d28c3f154afc093";
const redirectUri =
  window.location.hostname === "cb28166.github.io"
    ? "https://cb28166.github.io/Spotify-API-Project/"
    : "https://unfortuitous-tumidly-racquel.ngrok-free.dev/callback";

let accessToken = "";

const Spotify = {
    
    async getAccessToken() {
        // If we already have a token in memory, we return it
        if (accessToken) return accessToken;

        //If token exist in storage and not expired we reuse it
        const storedToken = localStorage.getItem("access_token");
        const storedExpiration = localStorage.getItem("expiration_time");

        if (storedToken && storedExpiration && Date.now() < Number(storedExpiration)) {
            accessToken = storedToken;
            return accessToken;
        }

        //check if Spotify redirected back with a code
        const code = new URLSearchParams(window.location.search).get("code");

        if (code) {
            return await this.exchangeCodeForToken(code);
        }
        else {
            //No token and no code -> start the login flow
            await this.redirectToAuthCodeFlow();
        }
    },

    async redirectToAuthCodeFlow() {
        //this is my secrete string we use for PKCE login flow
        const codeVerifier = this.generateRandomString(64);
        localStorage.setItem("code_verifier", codeVerifier);

        const codeChallenge = await this.generateCodeChallenge(codeVerifier);

        const authUrl = 
            `https://accounts.spotify.com/authorize` +
            `?client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=playlist-modify-public` +
            `&code_challenge_method=S256` +
            `&code_challenge=${codeChallenge}`;

        window.location.href = authUrl;
    },

    async exchangeCodeForToken(code) {
        const codeVerifier = localStorage.getItem("code_verifier");

        const body = new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        });

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: body
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const data = await response.json();

        accessToken = data.access_token;

        //stores the token + handles expiration
        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("expiration_time", expirationTime);

        //cleans the url removing the code from it for saftey
        window.history.replaceState({}, document.title, redirectUri);

        return accessToken;
    },

    generateRandomString(length) {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        return Array.from(crypto.getRandomValues(new Uint8Array(length)))
            .map(x => possible[x % possible.length])
            .join("");
    },

    async generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await crypto.subtle.digest("SHA-256", data);

        return btoa(String.fromCharCode(...new Uint8Array(digest)))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }
};

export default Spotify;