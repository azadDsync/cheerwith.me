"use client";
import Celebrate from "@/components/Celebrate";
import { useApiData } from "@/hooks/useApiData";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function LandingPage() {
  // router not currently used
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useApiData();
  const [get, set] = useState(false);
  const preloadAssets = useCallback(async () => {
    setIsLoading(true);

    const imageAssets = [
      "/svgs/prop1.svg",
      "/svgs/prop2.svg",
      "/svgs/prop3.svg",
      "/svgs/l-plane.svg",
      "/svgs/r-plane.svg",
      "/svgs/bubble.svg",
      "/svgs/emoji-stud.svg",
      "/svgs/star1.svg",
      "/svgs/star2.svg",
      "/svgs/sir.svg",
      "/svgs/navoday.svg",
      "/gifs/me.gif",
      "/gifs/doge-dance.gif",
    ];

    // Audio assets based on current celebration config
    const audioAssets = [
      data?.data?.celebrationSound,
      data?.data?.backgroundMusic,
    ].filter(Boolean) as string[];

    try {
      // Preload images
      const imagePromises = imageAssets.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      // Preload audio
      const audioPromises = audioAssets.map((src) => {
        return new Promise((resolve, reject) => {
          const audio = new Audio(src);
          audio.preload = "auto";
          audio.addEventListener("canplaythrough", resolve, { once: true });
          audio.addEventListener("error", reject, { once: true });
          // Force loading
          audio.load();
        });
      });

      // Wait for all assets to load
      await Promise.all([...imagePromises, ...audioPromises]);

      setAssetsLoaded(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error preloading assets:", error);
      setIsLoading(false);
      // Still allow the component to render even if some assets fail
      setAssetsLoaded(true);
    }
  }, [data?.data?.celebrationSound, data?.data?.backgroundMusic]);
  const playAudio = useCallback(
    (src: string, loop = false) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio(src);
        audio.volume = 0.9;
        audio.loop = loop;
        audio.preload = "metadata";

        if (loop) {
          audio.addEventListener("playing", () => resolve(), { once: true });
        } else {
          audio.addEventListener("ended", () => resolve(), { once: true });
        }
        audio.addEventListener("error", (e) => reject(e));
        audio.play().catch(reject);
      }),
    []
  );
  const handleClick = useCallback(async () => {
    if (!assetsLoaded) {
      await preloadAssets();
    }
    try {
      set(true);
      const sound = data?.data?.celebrationSound;
      const music = data?.data?.backgroundMusic;
      if (sound) {
        await playAudio(sound);
      }
      if (music) {
        await playAudio(music, true);
      }
    } catch (err) {
      console.error("Audio play failed:", err);
    }
  }, [playAudio, data?.data, assetsLoaded, preloadAssets]);

  // Show a human-friendly date instead of a raw timestamp, e.g. "7 Sep 2025"
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Prefer explicit greeting when available; otherwise show loading skeleton
  const greeting = data?.quote ?? data?.data?.greet ?? null;

  return (
    <div className=" bg-[#084D4B]  vignette h-screen w-screen  ">
      {data?.data && assetsLoaded ? (
        <Celebrate customConfig={data?.data ?? undefined} />
      ) : (
        <section
          className="h-screen w-screen element flex flex-col items-center justify-center gap-4"
          aria-labelledby="welcome-heading"
        >
          <h1 className="center text-white text-sm sm:text-base md:text-lg font-semibold">{date}</h1>
          <header className="text-center mb-6">
            <h1
              id="welcome-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white text-center mb-2 leading-tight font-extrabold"
              aria-label="Pranam Sir - Welcome greeting in Hindi"
              aria-live="polite"
            >
              {greeting ? (
                <>
                  &quot; {greeting} &quot;
                </>
              ) : (
                // three-dot loading animation (accessible)
                <span className="flex items-center justify-center gap-2 mx-auto" aria-hidden="true">
                  <span className="h-2 w-2 bg-white rounded-full dot-bounce" style={{ animationDuration: '1s', animationDelay: '0s' }} />
                  <span className="h-2 w-2 bg-white rounded-full dot-bounce" style={{ animationDuration: '1s', animationDelay: '0.15s' }} />
                  <span className="h-2 w-2 bg-white rounded-full dot-bounce" style={{ animationDuration: '1s', animationDelay: '0.3s' }} />
                  <span className="sr-only">Loading</span>
                </span>
              )}
            </h1>
            {/* <p className="text-white/90 text-lg md:text-xl font-medium">
              Digital Greenboard Celebrations
            </p> */}
          </header>
          {data?.data && (
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={`doodle-btn text-sm sm:text-base md:text-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Start celebration with music and confetti - just like school days"
              type="button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading Celebration...
                </span>
              ) : (
                "🎉 Enter Class 11-B"
              )}
            </button>
          )}
          <Link
            href="/draw"
            className="text-white/85 underline mt-2 text-sm sm:text-base hover:text-white"
          >
            Show your creativity →
          </Link>
          <div className="text-white/80 text-sm sm:text-base md:text-lg mt-6 text-center max-w-lg px-4">
            <p className="mb-2 font-medium text-sm sm:text-base md:text-lg">
              Celebrate everything the school way!
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed">
              {/* Birthdays • Festivals • National Days • Achievements • Teacher
              Appreciation
              <br /> */}
              <span className="text-white/60">
                -JNV Kanker 7th Batch,2019🎈
              </span>
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
