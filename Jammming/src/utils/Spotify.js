const clientId = "e346aa5709f44eda9d28c3f154afc093";
const redirectUri =
  window.location.hostname === "cb28166.github.io"
    ? "https://cb28166.github.io/Spotify-API-Project/"
    : "https://unfortuitous-tumidly-racquel.ngrok-free.dev/";

let accessToken = "";

const Spotify = {

    // Get the actual token from Spotify API
    async getAccessToken() {
        const storedToken = localStorage.getItem("access_token");
        const storedExpiration = localStorage.getItem("expiration_time");

        if (!storedToken || !storedExpiration || Date.now() >= Number(storedExpiration)) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("expiration_time");
            accessToken = ""; // Clear in-memory token
        }

        if (accessToken) return accessToken;

        if (storedToken && storedExpiration && Date.now() < Number(storedExpiration)) {
            accessToken = storedToken;
            return accessToken;
        }

        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
            return await this.exchangeCodeForToken(code);
        } else {
            await this.redirectToAuthCodeFlow();
        }
    },

    async redirectToAuthCodeFlow() {
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

        const response = await fetch("http://localhost:8888/exchange_token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code, code_verifier: codeVerifier })
        });

        if (!response.ok) throw new Error("Failed to fetch access token");

        const data = await response.json();
        accessToken = data.access_token;

        const expirationTime = Date.now() + data.expires_in * 1000;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("expiration_time", expirationTime);

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

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        if (body) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
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
            const token = await this.getAccessToken();
            console.log("Token being used to add tracks:", token);

            const playlist = await this.apiRequest(
                "me/playlists",
                "POST",
                { name: name, public: true }
            );

            console.log("Playlist response:", playlist);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s

            const playlistId = playlist.id;
            console.log("Playlist ID:", playlistId);
            console.log("Track URIs:", trackUris);

            const me = await this.apiRequest("me");
            console.log("Playlist owner ID:", playlist.owner.id, "Token belongs to user ID:", me.id);

            const urisParam = encodeURIComponent(trackUris.join(','));
            const addTracksResponse = await this.apiRequest(
                `playlists/${playlistId}/tracks?uris=${urisParam}`,
                "POST"
            );

            console.log("Tracks added response:", addTracksResponse);

        } catch (error) {
            console.error("Error saving playlist:", error);
        }
    }
};

export default Spotify;