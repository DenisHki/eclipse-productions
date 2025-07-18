import AudioPlayer from "react-modern-audio-player";
import { playList } from "../playList";

export default function Player() {
  return (
    //<div className="bg-bodyColor p-4 rounded-lg mx-auto w-full">
      <div className="player-container">
        <AudioPlayer
          playList={playList}
          activeUI={{
            all: true,
            progress: "waveform",
          }}
          placement={{
            player: "static",
            playList: "bottom",
          }}
          rootContainerProps={{
            colorScheme: "dark",
            width: "100%",
          }}
        />
      </div>
    //</div>
  );
}
