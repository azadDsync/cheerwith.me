"use client";
import Celebrate from "@/components/Celebrate";
import { useCallback, useState } from "react";
import { celebrationThemes, detectCelebrationType } from "@/lib/celebrations";

export default function LandingPage() {
  const [get, set] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [selectedCelebration, setSelectedCelebration] = useState<string | null>(null);
  const currentCelebration = selectedCelebration || detectCelebrationType();
  const config = celebrationThemes[currentCelebration];
  
  const preloadAssets = useCallback(async () => {
    setIsLoading(true);
    
    
    const imageAssets = [
      '/svgs/prop1.svg',
      '/svgs/prop2.svg',
      '/svgs/prop3.svg',
      '/svgs/l-plane.svg',
      '/svgs/r-plane.svg',
      '/svgs/bubble.svg',
      '/svgs/emoji-stud.svg',
      '/svgs/star1.svg',
      '/svgs/star2.svg',
      '/svgs/sir.svg',
      '/svgs/navoday.svg',
      '/gifs/me.gif',
      '/gifs/doge-dance.gif'
    ];

    // Audio assets based on current celebration config
    const audioAssets = [
      config.celebrationSound,
      config.backgroundMusic
    ].filter(Boolean);

    try {
      // Preload images
      const imagePromises = imageAssets.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      // Preload audio
      const audioPromises = audioAssets.map(src => {
        return new Promise((resolve, reject) => {
          const audio = new Audio(src);
          audio.preload = 'auto';
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', reject, { once: true });
          // Force loading
          audio.load();
        });
      });

      // Wait for all assets to load
      await Promise.all([...imagePromises, ...audioPromises]);
      
      setAssetsLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error preloading assets:', error);
      setIsLoading(false);
      // Still allow the component to render even if some assets fail
      setAssetsLoaded(true);
    }
  }, [config.celebrationSound, config.backgroundMusic]);

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
    if (!assetsLoaded) {
      await preloadAssets();
    }
    
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
  }, [playAudio, config, assetsLoaded, preloadAssets]);
  
  return (
    <div className="bg-[#084D4B] h-screen w-screen">
      {get && assetsLoaded ? (
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
            disabled={isLoading}
            className={`doodle-btn ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Start celebration with music and confetti - just like school days"
            type="button"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading Celebration...
              </span>
            ) : (
              '🎉 Start Celebration'
            )}
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
