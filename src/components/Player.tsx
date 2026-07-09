import AudioPlayer from "react-modern-audio-player";
import { playList } from "../playList";
import { useEffect, useRef, useState } from "react";

export default function Player() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const syncActiveTrack = () => {
      const currentSrc = audioEl.getAttribute("src");
      const idx = playList.findIndex((track) => track.src === currentSrc);
      if (idx !== -1) setActiveIndex(idx);
    };

    syncActiveTrack();

    const observer = new MutationObserver(syncActiveTrack);
    observer.observe(audioEl, { attributes: true, attributeFilter: ["src"] });

    return () => observer.disconnect();
  }, [isMobile]);

  const activeTrack = playList[activeIndex];

  if (isMobile) {
    return (
      <div className="player-container mobile-layout">
        <div className="mobile-track-info">
          <div className="track-artwork">
            {activeTrack?.img && (
              <img
                src={activeTrack.img}
                alt={activeTrack.name}
                style={{ width: "80px", height: "80px", borderRadius: "8px" }}
              />
            )}
          </div>
          <div className="track-details">
            <div className="track-name">{activeTrack?.name}</div>
            <div className="track-artist">{activeTrack?.writer}</div>
          </div>
        </div>

        <AudioPlayer
          audioRef={audioRef}
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
