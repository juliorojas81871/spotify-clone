import { useSession } from "next-auth/react";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { useState, useEffect, useCallback } from "react";
import useSongInfo from "../hooks/useSongInfo";
import { debounce } from "lodash";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  // need current track that's waiting
  const [currentTrackId, setCurrentIdTrack] =
    useRecoilState(currentTrackIdState);
  // need to know if the song is playing
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  // use hook to get song info
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    // if there's no song info
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentIdTrack(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      // check if there's a song playing
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // fetch the song info
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  // we are going to have a useEffect that will update the volume
  // Debounce the volume - you make just one request to the API, instead of
  useEffect(() => {
    //when the volume changes, update the volume
    if (volume >= 0 && volume <= 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  // useCallback allows us to have a memorized function
  // create this function once
  // debounce the function - only call it once every 500ms
  const debouncedAdjustVolume = useCallback(
    // basically just like a normal useEffect
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

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
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          // onClick={() => spotifyApi.skipToPrevious()} -- The API isn't working
        />
        {isPlaying ? (
          // if the song is playing, show the pause button
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          // if the song is paused, show the play button
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}

        <FastForwardIcon
          // onClick={() => spotifyApi.skipToPrevious()} -- The API isn't working
          className="button"
        />
        <ReplyIcon className="button" />
      </div>
      {/* Right */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume >= 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          type="range"
          value={volume}
          min={0}
          max={100}
          className="w-14 md:w-28 cursor-pointer"
          // debouncing to prevent spotify api to stop my key due to multiple requests
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <VolumeUpIcon
          onClick={() => volume <= 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
