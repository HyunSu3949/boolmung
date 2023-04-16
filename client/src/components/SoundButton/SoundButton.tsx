import React, { useState, useEffect, useRef } from "react";

export const SoundButton = () => {
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFile = "/sound/fireSound.mp3";

  useEffect(() => {
    if (playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [playing]);

  useEffect(() => {
    const handleEnded = () => setPlaying(false);
    audioRef.current?.addEventListener("ended", handleEnded);

    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <div>
      <audio ref={audioRef} src={audioFile} loop />
      <button onClick={togglePlaying}>
        {playing ? "소리 끄기" : "소리 켜기"}
      </button>
    </div>
  );
};
