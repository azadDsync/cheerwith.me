import Image from "next/image";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import GifPressOverlay from "./GifPressOverlay";
import { type CelebrationConfig } from "@/lib/celebrations";

interface CelebrateProps {
  type?: string;
  customConfig?: Partial<CelebrationConfig>;
}

export default function Celebrate({ customConfig }: CelebrateProps) {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  const config = {
    ...customConfig,
  };

  const confettiColors = [
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
  ];

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    detectSize();
    window.addEventListener("resize", detectSize);

    // Additional protection for images in this component
    const protectImages = () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.setAttribute("draggable", "false");
        img.setAttribute("ondragstart", "return false;");
        img.setAttribute("oncontextmenu", "return false;");
        img.style.userSelect = "none";
        img.style.pointerEvents = "none";
        (
          img.style as CSSStyleDeclaration & { webkitUserDrag?: string }
        ).webkitUserDrag = "none";
        (
          img.style as CSSStyleDeclaration & { webkitTouchCallout?: string }
        ).webkitTouchCallout = "none";
      });
    };

    // Protect images immediately and after a short delay
    protectImages();
    const timer = setTimeout(protectImages, 100);

    return () => {
      window.removeEventListener("resize", detectSize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <GifPressOverlay
      gifSrc="/gifs/doge-dance.gif"
      alt="Celebration dance animation"
      className="h-screen relative overflow-hidden cursor-pointer select-none"
    >
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.1}
        colors={confettiColors}
      />

      {/* Decorative Elements */}
      <div
        className="absolute top-0 left-0 hidden sm:block opacity-[50%] md:opacity-[80%] "
        aria-hidden="true"
      >
        <Image src="/svgs/prop1.svg" alt="" width={300} height={300} priority  />
      </div>
      <div
        className="absolute top-0 right-0 hidden sm:block opacity-[50%] md:opacity-[80%]"
        aria-hidden="true"
      >
        <Image src="/svgs/prop2.svg" alt="" width={300} height={300} priority />
      </div>
      <div
        className="absolute top-[50%] left-[10%] sm:left-[30%]"
        aria-hidden="true"
      >
        <Image
          src="/svgs/l-plane.svg"
          alt="Paper airplane decoration"
          width={50}
          height={50}
          className="sm:w-[100px]"
        />
      </div>
      <div
        className="absolute top-[30%] right-[10%] sm:right-[25%]"
        aria-hidden="true"
      >
        <Image
          src="/svgs/r-plane.svg"
          alt="Paper airplane decoration"
          width={50}
          height={50}
          className="sm:w-[100px]"
        />
      </div>
      <div
        className="absolute top-0 w-full flex justify-center opacity-[60%] md:opacity-[80%]"
        aria-hidden="true"
      >
        <Image
          src="/svgs/prop3.svg"
          alt=""
          width={300}
          height={300}
          className="sm:w-[400px]"
          priority
        />
      </div>
      <div className="absolute top-[8%] left-[35%]" aria-hidden="true">
        <Image src="/svgs/bubble.svg" alt="" width={500} height={500} />
      </div>
      <div
        className="absolute top-[38%] sm:top-[22%] md:top-[23%] left-[10%] sm:left-[58%] md:left-[67%] opacity-[50%] sm:opacity-[100%]"
        aria-hidden="true"
      >
        <Image
          src="/svgs/emoji-stud.svg"
          alt="Student emoji decoration"
          width={40}
          height={40}
          className="sm:w-[80px]"
        />
      </div>
      <div
        className="absolute top-[10%] sm:top-[5%] right-[22%]"
        aria-hidden="true"
      >
        <Image
          src="/svgs/star2.svg"
          alt="Star decoration"
          width={20}
          height={20}
          className="sm:w-[50px] sm:h-[30px]"
        />
      </div>
      <div className="absolute top-[50%] right-0" aria-hidden="true">
        <Image
          src="/gifs/me.gif"
          alt="Animated character"
          width={50}
          height={50}
          className="sm:w-[100px]"
          unoptimized
        />
      </div>

      {/* Main Content */}
      <article className="flex flex-col items-center justify-center font-bold text-4xl sm:text-6xl md:text-8xl text-white pt-30">
        <div className="absolute top-[20%] left-[25%]" aria-hidden="true">
          <Image
            src="/svgs/star1.svg"
            alt=""
            width={20}
            height={20}
            className="sm:w-[50px]"
          />
        </div>
        <header>
          <h1 className="text-center">
            <span className="block">{config.title}</span>
            <span className="block">{config.name}</span>
          </h1>
          {/* {config.subtitle && (
            <p className="text-lg sm:text-2xl md:text-3xl font-normal mt-4 opacity-90">
              {config.subtitle}
            </p>
          )} */}
        </header>
      </article>

      <section
        className="flex flex-col items-center justify-center"
        aria-labelledby="celebration-tribute"
      >
        <div className="">
          {config.img ? (
            <Image
              src={config.img || "/svgs/flower.svg"}
              alt="subject image"
              width={200}
              height={200}
              className="sm:h-auto sm:w-auto"
              priority
            />
          ) : (
            <Image
              src="/svgs/flower.svg"
              alt="Teacher illustration - respected educator"
              width={150}
              height={150}
              className="sm:h-auto sm:w-auto"
              priority
            />
          )}
        </div>
        <Image
          src="/svgs/navoday.svg"
          alt="School celebration - Navodaya spirit"
          width={300}
          height={300}
          className="sm:w-[400px] sm:h-[150px] opacity-[70%] md:opacity-[90%]"
          priority
        />
      </section>

      <footer className="pt-7">
        <blockquote className="text-center text-white text-lg sm:text-2xl md:text-4xl font-bold mx-auto">
          <p>&quot;{config.quote}&quot;</p>
          {config.cite && (
            <cite className="block text-sm sm:text-lg font-normal mt-2 opacity-75">
              - {config.cite}
            </cite>
          )}
        </blockquote>
      </footer>
    </GifPressOverlay>
  );
}
