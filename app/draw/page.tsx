import type { Metadata } from "next";
import DrawingBoard from "@/components/DrawingBoard";

export const metadata: Metadata = {
  title: "Drawing Board - Cheer With Me",
  description:
    "Freely draw like on a school board. Choose colors, erase, and download your artwork as an image.",
};

export default function DrawPage() {
  return (
  <div className="h-[100dvh] w-screen bg-[#084D4B]  text-white flex">
      {/* <section className="mx-auto w-full max-w-7xl px-4 py-4 md:py-5 flex-1 flex flex-col min-h-0">
        <header className="mb-3 flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold">Drawing Board</h1>
          <Link
            href="/"
            className="text-sm underline decoration-white/50 hover:decoration-white"
          >
            ← Back to Home
          </Link>
        </header>
        <p className="text-white/80 mb-3 text-sm">
          Pick a color, draw freely, erase mistakes, clear the board, and download your art.
        </p>
        <div className="rounded-lg overflow-hidden border border-white/15 bg-black/10 flex-1 min-h-0">
          
        </div>
      </section> */}
      <DrawingBoard />
    </div>
  );
}
