import { FC, useRef, useState } from "react";
import ReactPlayer from "react-player";
import s from "./VideoPlayer.module.scss";
import playIcon from "@/assets/videos/play.svg";
import pauseIcon from "@/assets/videos/pause.svg";
import Image from "next/image";
import fullIcon from "@/assets/videos/full.svg";
import volumeIcon from "@/assets/videos/sound.svg";
import volumeOffIcon from "@/assets/videos/volumeOff.svg";
import logo from "@/assets/images/logoMini.svg";

interface IVideoProps {
  video: any;
  styleWidth?: any;
  styleHeight?: any;
}

const VideoPlayer: FC<IVideoProps> = ({ video, styleWidth, styleHeight }) => {
  const [play, setPlay] = useState({
    playing: false,
    volume: 0.2,
    played: 0,
    duration: 0,
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volumeInfo, setVolumeInfo] = useState({
    muted: false,
    lastVolume: 0.2,
  });

  const { playing, volume, played, duration } = play;
  const playerRef = useRef<any>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const rounded = Math.floor(seconds);
    const minutes = Math.floor(rounded / 60);
    const remainingSeconds = rounded % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handlePlay = () => {
    setPlay({ ...play, playing: !play.playing });
  };
  const handleVolume = (e: any) => {
    const newVolume = parseFloat(e.target.value);
    setPlay({ ...play, volume: newVolume });
    if (newVolume > 0) {
      setVolumeInfo({ muted: false, lastVolume: newVolume });
    }
  };
  const handleProgress = (progress: any) => {
    setPlay({ ...play, played: progress.played });
  };
  const handleSeekChange = (e: any) => {
    const newPlayed = parseFloat(e.target.value);
    setPlay({ ...play, played: newPlayed });
    playerRef.current.seekTo(newPlayed * duration);
  };
  const handleDuration = (duration: any) => {
    setPlay({ ...play, duration });
  };
  const toggleMute = () => {
    setVolumeInfo((currentVolumeInfo) => {
      if (!currentVolumeInfo.muted) {
        setPlay({ ...play, volume: 0 });
        return { ...currentVolumeInfo, muted: true, lastVolume: play.volume };
      } else {
        setPlay({ ...play, volume: currentVolumeInfo.lastVolume });
        return { ...currentVolumeInfo, muted: false };
      }
    });
  };
  const toggleFullScreen = () => {
    if (playerContainerRef.current) {
      if (!document.fullscreenElement) {
        playerContainerRef.current.requestFullscreen().catch((err) => {
          alert(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className={s.player} ref={playerContainerRef}>
      <ReactPlayer
        url={video}
        playing={playing}
        controls={false}
        width={isFullscreen ? "100%" : styleWidth}
        height={isFullscreen ? "100%" : styleHeight}
        volume={volume}
        ref={playerRef}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className={s.controls}>
        <input
          className={s.track}
          type="range"
          min="0"
          max="1"
          step="any"
          value={played}
          onChange={handleSeekChange}
        />
        <div className={s.content}>
          <div className={s.wrapper}>
            <div className={s.play} onClick={() => handlePlay()}>
              <Image
                style={{ cursor: "pointer" }}
                src={!playing ? playIcon : pauseIcon}
                alt="aa"
              />
            </div>
            {isFullscreen && (
              <p className={s.numbers}>{`${formatTime(
                played * duration
              )} / ${formatTime(duration)}`}</p>
            )}
            {isFullscreen && (
              <Image width={37} height={30} src={logo} alt="logo" />
            )}
          </div>
          <div className={s.container}>
            <div className={s.volume}>
              <input
                className={s.volumeRange}
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolume}
              />
              <Image
                onClick={toggleMute}
                style={{ cursor: "pointer" }}
                src={volumeInfo.muted ? volumeOffIcon : volumeIcon}
                alt="aa"
              />
            </div>
            <div className={s.full} onClick={toggleFullScreen}>
              <Image style={{ cursor: "pointer" }} src={fullIcon} alt="aa" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
