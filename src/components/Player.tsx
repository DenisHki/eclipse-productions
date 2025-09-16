import AudioPlayer from "react-modern-audio-player";
import { playList } from "../playList";
import { useEffect, useState } from "react";

export default function Player() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile) {
    return (
      <div className="player-container mobile-layout">
        <div className="mobile-track-info">
          <div className="track-artwork">
            {playList[0]?.img && (
              <img
                src={playList[0].img}
                alt={playList[0].name}
                style={{ width: "80px", height: "80px", borderRadius: "8px" }}
              />
            )}
          </div>
          <div className="track-details">
            <div className="track-name">{playList[0]?.name}</div>
            <div className="track-artist">{playList[0]?.writer}</div>
          </div>
        </div>

        <AudioPlayer
          playList={playList}
          activeUI={{
            playButton: true,
            progress: "bar" as const,
            repeatType: true,
            trackTime: true,
            prevNnext: true,
            trackInfo: false,
            playList: isMobile ? "sortable" : "unSortable",
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
    );
  }

  return (
    <div className="player-container">
      <AudioPlayer
        playList={playList}
        activeUI={{
          all: true,
          progress: "waveform" as const,
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
  );
}
