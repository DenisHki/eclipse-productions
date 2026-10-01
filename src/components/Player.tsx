import AudioPlayer, {
  audioPlayerStateContext,
  audioPlayerDispatchContext,
} from "react-modern-audio-player";
import { playList } from "../playList";
import { useContext, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { MdPlayArrow, MdPause } from "react-icons/md";

function TrackList() {
  const [isOpen, setIsOpen] = useState(true); 
  const audioPlayerState = useContext(audioPlayerStateContext);
  const dispatch = useContext(audioPlayerDispatchContext);
  const { t } = useLanguage();

  if (!audioPlayerState || !dispatch) return null;

const { playList: currentPlayList, curIdx, curAudioState } =
    audioPlayerState;

  const playTrack = (index: number, id: number) => {
 
    if (index === curIdx) {
      dispatch({
        type: "CHANGE_PLAYING_STATE",
        state: !curAudioState.isPlaying,
      });
      return;
    }

    dispatch({
      type: "SET_CURRENT_AUDIO",
      currentIndex: index,
      currentAudioId: id,
    });
    
    setTimeout(() => {
      dispatch({
        type: "CHANGE_PLAYING_STATE",
        state: true,
      });
    }, 0);
  };

  return (
    <div className="track-list-wrapper">
      <button
        type="button"
        className="track-list-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        {isOpen ? t.music.hideTracklist : t.music.showTracklist}
      </button>

      {isOpen && (
        <ul className="track-list-items">
          {currentPlayList.map((track, index) => (
            <li
              key={track.id}
              className={`track-list-item${index === curIdx ? " active" : ""}`}
              onClick={() => playTrack(index, track.id)}
            >
              <span className="track-list-item-icon">
                {index === curIdx && curAudioState.isPlaying ? (
                  <MdPause />
                ) : (
                  <MdPlayArrow />
                )}
              </span>
              <span className="track-list-item-text">
                {track.writer} - {track.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
            playList: false,
          }}
          placement={{
            player: "static",
            playList: "bottom",
          }}
          rootContainerProps={{
            colorScheme: "dark",
            width: "100%",
          }}
        >
          <AudioPlayer.CustomComponent id="track-list">
            <TrackList />
          </AudioPlayer.CustomComponent>
        </AudioPlayer>
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
          playList: false,
        }}
        placement={{
          player: "static",
          playList: "bottom",
        }}
        rootContainerProps={{
          colorScheme: "dark",
          width: "100%",
        }}
      >
        <AudioPlayer.CustomComponent id="track-list">
          <TrackList />
        </AudioPlayer.CustomComponent>
      </AudioPlayer>
    </div>
  );
}