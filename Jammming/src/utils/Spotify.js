const clientId = "e346aa5709f44eda9d28c3f154afc093";
const redirectUri =
  window.location.hostname === "cb28166.github.io"
    ? "https://cb28166.github.io/Spotify-API-Project/"
    : "https://unfortuitous-tumidly-racquel.ngrok-free.dev/";

let accessToken = "";

const Spotify = {

    //get the actual token from spotify API
    async getAccessToken() {
        const storedToken = localStorage.getItem("access_token");
        const storedExpiration = localStorage.getItem("expiration_time");
        // Check if token is expired or missing
        if (!storedToken || !storedExpiration || Date.now() >= Number(storedExpiration)) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("expiration_time");
            accessToken = ""; // Clear the in-memory token too!
        }
        // If we already have a valid token in memory, return it
        if (accessToken) return accessToken;
        // If token exists in storage and not expired, reuse it
        if (storedToken && storedExpiration && Date.now() < Number(storedExpiration)) {
            accessToken = storedToken;
            return accessToken;
        }
        // Check if Spotify redirected back with a code
        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            return await this.exchangeCodeForToken(code);
        } else {
            await this.redirectToAuthCodeFlow();
        }
    },

    async redirectToAuthCodeFlow() {
        //this is my secrete string we use for PKCE login flow
        const codeVerifier = this.generateRandomString(64);
        localStorage.setItem("code_verifier", codeVerifier);

        const codeChallenge = await this.generateCodeChallenge(codeVerifier);

        const scope = "playlist-modify-public playlist-modify-private user-read-private";

        const authUrl = 
            `https://accounts.spotify.com/authorize` +
            `?client_id=${clientId}` +
            `&response_type=code` +
            `&redirect_uri=${encodeURIComponent(redirectUri)}` +
            `&scope=${encodeURIComponent(scope)}` +
            `&show_dialog=true` +
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
    },

    async apiRequest(endpoint, method = "GET", body = null) {
        const token = await this.getAccessToken();
        const url = `https://api.spotify.com/v1/${endpoint}`;

        console.log("Spotify request URL:", url);

        const headers = { Authorization: `Bearer ${token}` };
        if (body && method !== "GET") {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body && method !== "GET" ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Spotify API error:", errorBody);
            throw new Error("Spotify API request failed!");
        }

        if (response.status === 204) return {};

        return response.json();
    },


    async searchTracks(query) {

        const params = new URLSearchParams();
        params.append("q", query);
        params.append("type", "track");
        params.append('limit', 10);

        const endpoint = `search?${params.toString()}`;

        const data = await this.apiRequest(endpoint);

        return data.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists.map(a => a.name).join(", "),
            album: track.album.name,
            uri: track.uri,
            albumCover: track.album.images[0]?.url || ""
        }));
    },

    
    async savePlaylistName(name, trackUris) {
        if (!name || !trackUris.length) return;

        try {
            // Get token (will trigger login if none/fresh token)
            const token = await this.getAccessToken();
            console.log("Token being used to add tracks:", token);

            // Create the playlist
            const playlist = await this.apiRequest(
                "me/playlists",
                "POST",
                { name: name, public: true } // JSON body method
            );

            console.log("Playlist response:", playlist);

            // After creating playlist
            await new Promise(resolve => setTimeout(resolve, 1000)); // wait 1 second

            const playlistId = playlist.id;
            console.log("Playlist ID:", playlistId);
            console.log("Track URIs:", trackUris);

            // Double-check the playlist belongs to the user
            const me = await this.apiRequest("me");
            console.log("Playlist owner ID:", playlist.owner.id, "Token belongs to user ID:", me.id);

            // Add tracks using JSON body method (array directly)
            const addTracksResponse = await this.apiRequest(
                `playlists/${playlistId}/tracks`,
                "POST",
                { uris: trackUris } // <-- pass the array directly
            );

            console.log("Tracks added response:", addTracksResponse);

        } catch (error) {
            console.error("Error saving playlist:", error);
        }
    }
};

export default Spotify;