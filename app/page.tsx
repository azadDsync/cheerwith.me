"use client";
import Celebrate from "@/components/Celebrate";
import { useCallback, useState } from "react";

export default function Home() {
  const [get, set] = useState(false);
  const playAudio = (src: string, loop = false) =>
    new Promise<void>((resolve, reject) => {
      const audio = new Audio(encodeURI(src));
      audio.volume = 0.9;
      audio.loop = loop;
      if (loop) {
        audio.addEventListener("playing", () => resolve(), { once: true });
      } else {
        audio.addEventListener("ended", () => resolve(), { once: true });
      }
      audio.addEventListener("error", (e) => reject(e));
      audio.play().catch(reject);
    });

  const handleClick = useCallback(async () => {
    try {
      await playAudio("/sound/Voicy_Celebration sound effect.mp3");

      await playAudio("/sound/happy-teacher-day.mp3", true);
    } catch (err) {
      console.error("Audio play failed:", err);
    } finally {
      set(true);
    }
  }, []);
  return (
    <div className="bg-[#084D4B] h-screen w-screen ">
      {get ? (
        <Celebrate />
      ) : (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
          {/* <Image src="/gifs/PaperPlane.gif" height={150} width={150} alt="paper plane" /> */}
          <h1 className="text-3xl text-white">प्रणाम सर 🙏🏻</h1>
          <button
            onClick={() => {
              handleClick();
              set(true);
            }}
            className="doodle-btn"
          >
            click it
          </button>
        </div>
      )}
    </div>
  );
}
