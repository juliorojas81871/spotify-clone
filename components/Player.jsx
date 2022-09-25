import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { useState } from "react";
import useSongInfo from "../hooks/useSongInfo";
import { useEffect } from "react";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
   // need current track that's waiting
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState);
  // need to know if the song is playing
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  // use hook to get song info
  const songInfo = useSongInfo();

  const fetchCurrentSong=()=>{
    // if there's no song info
    if(!songInfo){
      spotifyApi.getMyCurrentPlayingTrack().then(data =>{
        console.log('now playing: ', data.body?.item);
        setCurrentIdTrack(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        })
      })
    }
  }

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId){
      // fetch the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt=""
        />
        <div>
        {/* ? mean optional chaining meaning it will gracefully handle it and won't throw an error*/}
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      {/* Center */}
      <div>
        <button>
          
        </button>
      </div>
    </div>
  );
};

export default Player;
