import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AUDIO_ACTIVE_EVENT = "robofounders:video-audio-active";

export default function AccessibleLoopVideo({
  src,
  poster,
  label,
  preload = "metadata",
  startWhenVisible = false,
  showToggle = true,
  showAudioToggle = false,
}) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.defaultMuted = true;
    video.muted = true;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isNearViewport = !startWhenVisible;

    const startPlayback = () => {
      if (!isNearViewport || prefersReducedMotion) return;
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => setPlaying(false));
    };
    const handlePlay = () => setPlaying(true);
    const handlePause = () => {
      setPlaying(false);
      video.muted = true;
      setMuted(true);
    };
    const muteWhenAnotherVideoStarts = (event) => {
      if (event.detail === video) return;
      video.muted = true;
      setMuted(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("canplay", startPlayback);
    window.addEventListener(AUDIO_ACTIVE_EVENT, muteWhenAnotherVideoStarts);

    let observer;
    if (startWhenVisible) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isNearViewport = entry.isIntersecting;
          if (isNearViewport) startPlayback();
          else video.pause();
        },
        { rootMargin: "240px 0px", threshold: 0.01 },
      );
      observer.observe(video);
    } else {
      startPlayback();
    }

    return () => {
      observer?.disconnect();
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("canplay", startPlayback);
      window.removeEventListener(AUDIO_ACTIVE_EVENT, muteWhenAnotherVideoStarts);
    };
  }, [src, startWhenVisible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  const toggleAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      window.dispatchEvent(new CustomEvent(AUDIO_ACTIVE_EVENT, { detail: video }));
      video.muted = false;
      setMuted(false);
      if (video.paused) {
        const playRequest = video.play();
        if (playRequest) playRequest.catch(() => {
          video.muted = true;
          setMuted(true);
        });
      }
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted
        preload={preload}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(event) => event.preventDefault()}
        poster={poster}
        aria-label={label}
        src={src}
      />
      {showToggle && (
        <button
          type="button"
          className="video-motion-toggle"
          onClick={togglePlayback}
          aria-label={playing ? t.ui.pauseVideo : t.ui.playVideo}
          aria-pressed={playing}
        >
          {playing ? (
            <Pause size={16} aria-hidden="true" />
          ) : (
            <Play size={16} aria-hidden="true" />
          )}
        </button>
      )}
      {showAudioToggle && (
        <button
          type="button"
          className="video-motion-toggle video-audio-toggle"
          onClick={toggleAudio}
          aria-label={muted ? t.ui.unmuteVideo : t.ui.muteVideo}
          aria-pressed={!muted}
        >
          {muted ? <VolumeX size={15} aria-hidden="true" /> : <Volume2 size={15} aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
