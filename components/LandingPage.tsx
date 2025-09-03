"use client";
import Celebrate from "@/components/Celebrate";
import { useCallback, useState } from "react";
import { celebrationThemes, detectCelebrationType } from "@/lib/celebrations";

export default function LandingPage() {
  const [get, set] = useState(false);
  const [selectedCelebration, setSelectedCelebration] = useState<string | null>(null);
  const currentCelebration = selectedCelebration || detectCelebrationType();
  const config = celebrationThemes[currentCelebration];
  
  const playAudio = useCallback((src: string, loop = false) =>
    new Promise<void>((resolve, reject) => {
      const audio = new Audio(src);
      audio.volume = 0.9;
      audio.loop = loop;
      audio.preload = 'metadata';
      
      if (loop) {
        audio.addEventListener("playing", () => resolve(), { once: true });
      } else {
        audio.addEventListener("ended", () => resolve(), { once: true });
      }
      audio.addEventListener("error", (e) => reject(e));
      audio.play().catch(reject);
    }), []);

  const handleClick = useCallback(async () => {
    try {
        set(true);
      if (config.celebrationSound) {
        await playAudio(config.celebrationSound);
      }
      if (config.backgroundMusic) {
        await playAudio(config.backgroundMusic, true);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  }, [playAudio, config]);
  
  return (
    <div className="bg-[#084D4B] h-screen w-screen">
      {get ? (
        <Celebrate type={currentCelebration} />
      ) : (
        <section className="h-screen w-screen flex flex-col items-center justify-center gap-4" aria-labelledby="welcome-heading">
          <header className="text-center mb-6">
            <h1 
              id="welcome-heading"
              className="text-3xl md:text-4xl text-white text-center mb-2"
              aria-label="Pranam Sir - Welcome greeting in Hindi"
            >
              प्रणाम सर 🙏🏻
            </h1>
            {/* <p className="text-white/90 text-lg md:text-xl font-medium">
              Digital Greenboard Celebrations
            </p> */}
          </header>
          <button
            onClick={handleClick}
            className="doodle-btn"
            aria-label="Start celebration with music and confetti - just like school days"
            type="button"
          >
            🎉 Start Celebration
          </button>
          <div className="text-white/80 text-sm mt-6 text-center max-w-lg px-4">
            <p className="mb-2 font-medium">Celebrate everything the school way!</p>
            <p className="text-xs leading-relaxed">
              Birthdays • Festivals • National Days • Achievements • Teacher Appreciation
              <br />
              <span className="text-white/60">Just like the greenboard doodles and celebrations we loved in school! 🎈</span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
