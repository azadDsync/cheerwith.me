import Image from "next/image";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import GifPressOverlay from "./GifPressOverlay";

export default function Celebrate() {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    detectSize();
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, []);
  return (
    <GifPressOverlay
      gifSrc="/gifs/doge-dance.gif"
      alt="Celebration Art"
      className="h-screen relative overflow-hidden cursor-pointer select-none"
    >
      <Confetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.1}
        colors={[
          "#FFD700",
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7",
          "#DDA0DD",
          "#98D8C8",
        ]}
      />
      <div className="absolute top-0 left-0 hidden sm:block opacity-[50%] md:opacity-[100%]">
        <Image
          src="/svgs/prop1.svg"
          alt="navoday SVG Icon"
          width={300}
          height={300}
        />
      </div>
      <div className="absolute top-0 right-0 hidden sm:block opacity-[50%] md:opacity-[100%]">
        <Image
          src="/svgs/prop2.svg"
          alt="navoday SVG Icon"
          width={300}
          height={300}
        />
      </div>
      <div className="absolute top-[50%] left-[10%] sm:left-[30%]">
        <Image
          src="/svgs/l-plane.svg"
          alt="navoday SVG Icon"
          width={50}
          height={50}
          className="sm:w-[100px]"
        />
      </div>

      <div className="absolute top-[30%] right-[10%] sm:right-[25%] ">
        <Image
          src="/svgs/r-plane.svg"
          alt="navoday SVG Icon"
          width={50}
          height={50}
          className=" sm:w-[100px]"
        />
      </div>
      <div className="absolute top-0 w-full flex justify-center">
        <Image
          src="/svgs/prop3.svg"
          alt="navoday SVG Icon"
          width={300}
          height={300}
          className="sm:w-[400px]"
        />
      </div>
      <div className="absolute top-[8%] left-[35%]">
        <Image
          src="/svgs/bubble.svg"
          alt="navoday SVG Icon"
          width={500}
          height={500}
        />
      </div>
      <div className="absolute top-[38%]  sm:top-[22%] md:top-[23%] left-[10%] sm:left-[58%] md:left-[67%] opacity-[50%] sm:opacity-[100%]">
        <Image
          src="/svgs/emoji-stud.svg"
          alt="navoday SVG Icon"
          width={40}
          height={40}
          className="sm:w-[80px]"
        />
      </div>
      <div className="absolute top-[10%] sm:top-[5%] right-[22%] ">
        <Image
          src="/svgs/star2.svg"
          alt="navoday SVG Icon"
          width={20}
          height={20}
          className="sm:w-[50px] sm:h-[30px]"
        />
      </div>
      <div className="absolute top-[50%] right-0">
        <Image
          src="/gifs/me.gif"
          alt="navoday SVG Icon"
          width={50}
          height={50}
          className="sm:w-[100px]"
        />
      </div>
      <div className="flex flex-col items-center justify-center font-bold text-4xl sm:text-6xl md:text-8xl text-white pt-30">
        <div className="absolute top-[20%] left-[25%]">
          <Image
            src="/svgs/star1.svg"
            alt="navoday SVG Icon"
            width={20}
            height={20}
            className="sm:w-[50px]"
          />
        </div>
        <h1 className=" text-center">HAPPY TEACHERS </h1>
        <h1 className="text-center">DAY</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="pl-5 sm:pl-40">
          <Image
            src="/svgs/sir.svg"
            alt="doom"
            width={200}
            height={200}
            className=" sm:w-[499px] sm:h-[426px]"
          />
        </div>
        <Image
          src="/svgs/navoday.svg"
          alt="navoday SVG Icon"
          width={300}
          height={300}
          className="sm:w-[400px] sm:h-[150px]"
        />
      </div>

      <div className="pt-7 ">
        <p className="text-center text-white text-lg sm:text-2xl md:text-4xl font-bold  mx-auto ">
          {/* “We may have grown older, but the Navodaya spirit in us will always
          stay young.” */}
            &quot; You made learning an art—thank you for nurturing creativity in us.&quot;
        </p>
      </div>
    </GifPressOverlay>
  );
}
