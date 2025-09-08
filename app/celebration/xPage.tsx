// "use client";

// import Celebrate from "@/components/Celebrate";
// import { useApiData } from "@/hooks/useApiData";
// import React, { useCallback, useEffect, useState } from "react";

// export default function Page() {
//   const { isLoading, isError, data, error } = useApiData();
//   const [get, set] = useState(false);

//   const playAudio = useCallback(
//     (src: string, loop = false) =>
//       new Promise<void>((resolve, reject) => {
//         const audio = new Audio(src);
//         audio.volume = 0.9;
//         audio.loop = loop;
//         audio.preload = "metadata";

//         if (loop) {
//           audio.addEventListener("playing", () => resolve(), { once: true });
//         } else {
//           audio.addEventListener("ended", () => resolve(), { once: true });
//         }
//         audio.addEventListener("error", (e) => reject(e));
//         audio.play().catch(reject);
//       }),
//     []
//   );

//   useEffect(() => {
//     if (!data?.data || get) return;
//     set(true);

//     (async () => {
//       try {
//         const sound = data?.data?.celebrationSound;
//         const music = data?.data?.backgroundMusic;
        
//         if (sound) {
//           await playAudio(sound, false);
//         }
//         if (music) {
//           await playAudio(music, true);
//         }
//       } catch (err) {
//         console.error("Audio play failed:", err);
//       }
//     })();
//   }, [data, get, playAudio]);

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div className="bg-[#084D4B]">
//       <Celebrate customConfig={data?.data ?? undefined} />
//     </div>
//   );
// }
