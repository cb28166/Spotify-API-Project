const clientId = "Spotify_Client_ID";
const redirectUri = "http://localhost:5173/"; //Saved as local host for now will switch to deployed website later 
let accessToken = "";

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;

        //check if token is in URL
        const urlParams = window.location.hash.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.hash.match(/expires_in=([^&]*)/);

        if (urlParams && expiresInMatch) {
            accessToken = urlParams[1];
            const expiresIn = Number(expiresInMatch[1]);

            //cleaning the url 
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        }
        else {
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = authUrl;
        }
    },

    //Place holder for later functions
};

export default Spotify;