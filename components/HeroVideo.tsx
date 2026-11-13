"use client";

import { useRef, useState } from "react";

/**
 * Video de fondo del hero con fundido de entrada.
 * Sin poster: mientras carga se ve el degradado de marca (--hero-gradient),
 * nunca una foto distinta a la del video.
 */
export function HeroVideo() {
  const [ready, setReady] = useState(false);
  const video = useRef<HTMLVideoElement | null>(null);

  return (
    <video
      ref={video}
      className={`hero__video${ready ? " is-ready" : ""}`}
      src="/video/hero-playa.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setReady(true)}
      onLoadedData={() => setReady(true)}
      aria-hidden="true"
    />
  );
}
