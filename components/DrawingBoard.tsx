"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<Point | null>(null);
  const dprRef = useRef(1);

  const backgroundColor = "#084D4B"; // match site greenboard background
  const [color, setColor] = useState<string>("#FFFFFF");
  const [brushSize, setBrushSize] = useState<number>(6);
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const palette = useMemo(
    () => [
      "#FFFFFF", // white
      "#FFE066", // yellow
      "#FF6B6B", // red
      "#4DABF7", // blue
      "#63E6BE", // mint
      "#FFD43B", // gold
      "#B197FC", // purple
      "#F06595", // pink
      "#A9E34B", // lime
    ],
    []
  );

  const getCanvasPoint = useCallback((evt: PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    // Use CSS pixel coordinates; the context is scaled by DPR
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    return { x, y };
  }, []);

  const drawLine = useCallback(
    (from: Point, to: Point) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.strokeStyle = tool === "eraser" ? backgroundColor : color;
  // With scaled context, lineWidth is in CSS pixels
  ctx.lineWidth = Math.max(1, brushSize);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    },
    [brushSize, color, tool]
  );

  const handlePointerDown = useCallback((evt: PointerEvent) => {
    evt.preventDefault();
    isDrawingRef.current = true;
    lastPointRef.current = getCanvasPoint(evt);
    // For immediate dot
    drawLine(lastPointRef.current, lastPointRef.current);
    (evt.target as Element).setPointerCapture?.(evt.pointerId);
  }, [drawLine, getCanvasPoint]);

  const handlePointerMove = useCallback((evt: PointerEvent) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const current = getCanvasPoint(evt);
    drawLine(lastPointRef.current, current);
    lastPointRef.current = current;
  }, [drawLine, getCanvasPoint]);

  const endDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const paintBackground = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    // Fill with identity transform to cover full device-pixel canvas
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1));

    const cssWidth = wrapper.clientWidth;
    const cssHeight = wrapper.clientHeight;

    // Skip if nothing changed (avoid clearing)
    const nextStyleW = cssWidth + "px";
    const nextStyleH = cssHeight + "px";
    if (
      canvas.style.width === nextStyleW &&
      canvas.style.height === nextStyleH &&
      dprRef.current === dpr
    ) {
      return;
    }

    // Preserve current drawing before resizing
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;
    let tmpCanvas: HTMLCanvasElement | null = null;
    if (oldWidth > 0 && oldHeight > 0) {
      tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = oldWidth;
      tmpCanvas.height = oldHeight;
      const tctx = tmpCanvas.getContext("2d");
      if (tctx) {
        tctx.drawImage(canvas, 0, 0);
      }
    }

    // Apply new size
    dprRef.current = dpr;
    canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
    canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
    canvas.style.width = nextStyleW;
    canvas.style.height = nextStyleH;

  const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing units to CSS pixels

    // After resize, paint background then restore previous drawing scaled to new size
    if (tmpCanvas) {
      // Fill background first so larger canvases aren't transparent
      paintBackground();
      const newCssW = cssWidth;
      const newCssH = cssHeight;
      const srcW = tmpCanvas.width;
      const srcH = tmpCanvas.height;
      // Draw previous pixels scaled to the new CSS size
  ctx.imageSmoothingEnabled = true;
  (ctx as CanvasRenderingContext2D & { imageSmoothingQuality?: "low" | "medium" | "high" }).imageSmoothingQuality = "high";
      ctx.drawImage(tmpCanvas, 0, 0, srcW, srcH, 0, 0, newCssW, newCssH);
    } else {
      // No previous content; just paint background
      paintBackground();
    }
  }, [paintBackground]);

  // Keep latest resize function in a ref for stable window listeners
  const resizeCanvasRef = useRef(resizeCanvas);
  useEffect(() => {
    resizeCanvasRef.current = resizeCanvas;
  }, [resizeCanvas]);

  // Mount-only: do initial sizing and handle window resizes without clearing on color changes
  useEffect(() => {
    // initial size
    resizeCanvasRef.current();
    const onWindowResize = () => resizeCanvasRef.current();
    window.addEventListener("resize", onWindowResize);
    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;

    const onDown = (e: PointerEvent) => handlePointerDown(e);
  const onMove = (e: PointerEvent) => handlePointerMove(e);
  const onUp = () => endDrawing();

  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);

    // Prevent touch scrolling while drawing
    const preventTouchScroll = (e: TouchEvent) => {
      if (isDrawingRef.current) e.preventDefault();
    };
    document.addEventListener("touchmove", preventTouchScroll, {
      passive: false,
    });

    return () => {
  canvas.removeEventListener("pointerdown", onDown);
  canvas.removeEventListener("pointermove", onMove);
  canvas.removeEventListener("pointerup", onUp);
      document.removeEventListener("touchmove", preventTouchScroll);
    };
  }, [endDrawing, handlePointerDown, handlePointerMove, resizeCanvas]);

  const onSelectColor = (c: string) => {
    setColor(c);
    setTool("pencil");
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset to device pixels for clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
    paintBackground();
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    const ts = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const name = `drawing-${ts.getFullYear()}${pad(ts.getMonth() + 1)}${pad(ts.getDate())}-${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}.png`;
    link.download = name;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Fullscreen controls
  const toggleFullscreen = async () => {
    const el = wrapperRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen().catch(() => {});
    } else {
      await document.exitFullscreen().catch(() => {});
    }
  };

  useEffect(() => {
    const onFs = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      // resize after fullscreen toggle to match new size
      requestAnimationFrame(resizeCanvas);
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, [resizeCanvas]);

  // Keep canvas sized to wrapper with ResizeObserver
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(resizeCanvas);
    });
    ro.observe(wrapper);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [resizeCanvas]);

  return (
  <div className="w-full flex-1 min-h-0 flex flex-col">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pr-1 -mr-1 max-w-full"
          aria-label="Color palette"
        >
          {palette.map((c) => (
            <button
              key={c}
              onClick={() => onSelectColor(c)}
              className={`h-6 w-6 sm:h-7 sm:w-7 shrink-0 rounded-full border-2 transition-transform ${
                tool === "pencil" && color === c ? "border-white scale-110" : "border-white/40"
              }`}
              style={{ backgroundColor: c }}
              title={`Choose color ${c}`}
              aria-label={`Choose color ${c}`}
            />
          ))}
        </div>

        <div className="hidden sm:block h-6 w-px bg-white/20 mx-1" />

        <label className="flex items-center gap-2 text-white/90">
          <span className="text-xs sm:text-sm">Brush</span>
          <input
            type="range"
            min={1}
            max={40}
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="w-28 sm:w-32"
          />
          <span className="text-xs sm:text-sm tabular-nums w-7 text-center">{brushSize}</span>
        </label>

        <div className="hidden sm:block h-6 w-px bg-white/20 mx-1" />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTool("pencil")}
            className={`px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm ${
              tool === "pencil"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/50 hover:border-white"
            }`}
            title="Pencil tool"
            aria-pressed={tool === "pencil"}
          >
            <span className="sm:hidden">✏️</span>
            <span className="hidden sm:inline">Pencil</span>
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm ${
              tool === "eraser"
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/50 hover:border-white"
            }`}
            title="Eraser tool"
            aria-pressed={tool === "eraser"}
          >
            <span className="sm:hidden">🧽</span>
            <span className="hidden sm:inline">Eraser</span>
          </button>
        </div>

        <button
          onClick={clearBoard}
          className="px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm text-white/90 border-white/40 hover:border-white sm:ml-auto"
          title="Clear board"
        >
          <span className="sm:hidden">⟳</span>
          <span className="hidden sm:inline">Clear</span>
        </button>

        <button
          onClick={downloadImage}
          className="px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm bg-emerald-400 text-black font-medium hover:bg-emerald-300 border-emerald-300"
          title="Download drawing"
        >
          <span className="sm:hidden">⬇️</span>
          <span className="hidden sm:inline">Download PNG</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className={`px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm ${
            isFullscreen
              ? "bg-white text-black border-white"
              : "bg-transparent text-white border-white/50 hover:border-white"
          }`}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <span className="sm:hidden">⛶</span>
          <span className="hidden sm:inline">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
        </button>
      </div>

      <div
        ref={wrapperRef}
        className="flex-1 min-h-0 allow-pointer"
        style={{ background: backgroundColor }}
      >
        <canvas ref={canvasRef} className="touch-none allow-pointer" />
      </div>
    </div>
  );
}
