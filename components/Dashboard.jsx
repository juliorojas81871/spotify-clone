import { Right, Sidebar, Body } from "../components";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const Dashboard = () => {
  return (
    <main>
      <Sidebar />
      <Body spotifyApi={spotifyApi} />
      <Right />
    </main>
  );
};

export default Dashboard;
