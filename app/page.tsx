"use client";
import Celebrate from "@/components/Celebrate";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [get, set] = useState(false);
  return (
    <div className="bg-[#084D4B] h-screen w-screen ">
      {get ? (
        <Celebrate />
      ) : (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
          {/* <Image src="/gifs/PaperPlane.gif" height={150} width={150} alt="paper plane" /> */}
          <h1 className="text-3xl text-white">प्रणाम सर</h1>
          <button onClick={()=> set(true)} className="doodle-btn">click it</button>
        </div>
      )}
    </div>
  );
}
