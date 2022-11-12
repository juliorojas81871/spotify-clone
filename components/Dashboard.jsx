import { Right, Sidebar, Body } from "../components";
import SpotifyWebApi from "spotify-web-api-node";
import { useRecoilState } from "recoil";
import { playingTrackState } from "../atoms/playerAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});




const Dashboard = () => {
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <main>
      <Sidebar />
      <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
      <Right />
    </main>
  );
};

export default Dashboard;
