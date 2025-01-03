import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"


const AudioPlayer = () => {

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);


  const { currentSong, isPlaying, playNext } = usePlayerStore();
  // handling play - pause logic here.....

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [audioRef, currentSong, isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleSongEnd = () => playNext();
    audio?.addEventListener("ended", handleSongEnd);
    return () => audio?.removeEventListener("ended", handleSongEnd);
  }, [playNext]);


  /// handling song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    // cheching if this is actally a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl || "";
      // reset the playback postion
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioUrl;
      /// pl
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />
}

export default AudioPlayer