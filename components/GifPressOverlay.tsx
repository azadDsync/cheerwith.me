"use client";
import React, { useState, useCallback, useEffect, PropsWithChildren } from "react";
import Image from "next/image";

interface GifPressOverlayProps {
  gifSrc: string; // path under public
  alt?: string;
  className?: string; // optional wrapper classes
  overlayBgClassName?: string; // customize backdrop
}

/**
 * Wrap any UI; while pointer (mouse/finger) is pressed on it, a full-screen GIF overlay appears.
 * Overlay hides on pointer/mouse/touch release (anywhere) or pressing Escape.
 */
export default function GifPressOverlay({
  children,
  gifSrc,
  alt = "",
  className = "",
  overlayBgClassName = "bg-black/80",
}: PropsWithChildren<GifPressOverlayProps>) {
  const [active, setActive] = useState(false);

  const end = useCallback(() => setActive(false), []);

  const start = useCallback((e: React.PointerEvent | React.MouseEvent | React.TouchEvent) => {
    // Only respond to primary button for mouse
    // For simplicity allow all touches
    // Prevent starting if already active
    if (active) return;
    if ("button" in e && (e as React.PointerEvent).button !== undefined && (e as React.PointerEvent).button !== 0) return;
    setActive(true);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") end();
    };
    const handleUp = () => end();
    window.addEventListener("keyup", handleKey);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("touchend", handleUp);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("keyup", handleKey);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("touchend", handleUp);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [active, end]);

  // Keyboard activation (Space / Enter) for accessibility
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (!active) setActive(true);
    } else if (e.key === "Escape") {
      end();
    }
  };

  return (
    <>
      <div
        className={className}
        role="button"
        tabIndex={0}
        onPointerDown={start}
        onMouseDown={start}
    onTouchStart={start as unknown as React.TouchEventHandler}
        onKeyDown={onKeyDown}
        aria-pressed={active}
      >
        {children}
      </div>
      {active && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center ${overlayBgClassName}`}
          aria-live="off"
        >
          <Image
            src={gifSrc}
            alt={alt}
            fill
            priority
            unoptimized
            style={{ objectFit: "contain" }}
          />
          <span className="absolute bottom-4 text-white text-sm opacity-70 select-none pointer-events-none">
            Release to close · Esc
          </span>
        </div>
      )}
    </>
  );
}
