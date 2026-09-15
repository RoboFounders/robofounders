import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AccessibleLoopVideo({
  src,
  poster,
  label,
  preload = "metadata",
  startWhenVisible = false,
}) {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

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
    const handlePause = () => setPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("canplay", startPlayback);

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
    };
  }, [src, startWhenVisible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true;
      const playRequest = video.play();
      if (playRequest) playRequest.catch(() => setPlaying(false));
    } else {
      video.pause();
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
    </>
  );
}
