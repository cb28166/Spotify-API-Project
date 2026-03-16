const clientId = "e346aa5709f44eda9d28c3f154afc093";
const redirectUri =
  window.location.hostname === "cb28166.github.io"
    ? "https://cb28166.github.io/Spotify-API-Project/"
    : "https://unfortuitous-tumidly-racquel.ngrok-free.dev/";

let accessToken = "";

const Spotify = {
  // Get access token using Implicit Grant flow
  async getAccessToken() {
    const storedToken = localStorage.getItem("access_token");
    const storedExpiration = localStorage.getItem("expiration_time");

    if (storedToken && storedExpiration && Date.now() < Number(storedExpiration)) {
      accessToken = storedToken;
      return accessToken;
    }

    // Check URL hash for token after redirect
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.slice(1));
      accessToken = params.get("access_token");
      const expiresIn = params.get("expires_in");

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("expiration_time", Date.now() + Number(expiresIn) * 1000);

        // Clean URL
        window.history.replaceState({}, document.title, redirectUri);
        return accessToken;
      }
    }

    // Redirect user to Spotify Implicit Grant flow
    const scope = "playlist-modify-public playlist-modify-private user-read-private";
    const authUrl =
      `https://accounts.spotify.com/authorize` +
      `?client_id=${clientId}` +
      `&response_type=token` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&show_dialog=true`;

    window.location.href = authUrl;
  },

  // Generic API request function
  async apiRequest(endpoint, method = "GET", body = null) {
    const token = await this.getAccessToken();
    const url = `https://api.spotify.com/v1/${endpoint}`;

    const headers = { Authorization: `Bearer ${token}` };
    if (body) headers["Content-Type"] = "application/json";

    const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : null });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Spotify API error:", errorBody);
      throw new Error("Spotify API request failed!");
    }

    return response.status === 204 ? {} : response.json();
  },

  // Search for tracks
  async searchTracks(query) {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("type", "track");
    params.append("limit", 10);

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

  // Save playlist and add tracks
  async savePlaylistName(name, trackUris) {
    if (!name || !trackUris.length) return;

    try {
      const token = await this.getAccessToken();

      // Create the playlist
      const playlist = await this.apiRequest("me/playlists", "POST", { name, public: true });
      const playlistId = playlist.id;

      console.log("Playlist created:", playlistId);
      console.log("Tracks to add:", trackUris);

      // Add tracks via query string (recommended for front-end)
      const urisParam = encodeURIComponent(trackUris.join(","));
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