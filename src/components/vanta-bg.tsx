"use client";

import { useEffect, useRef, useState } from "react";

type VantaEffect = "net" | "waves" | "cells" | "globe";

interface VantaBgProps {
  effect: VantaEffect;
  className?: string;
  options?: Record<string, unknown>;
}

export function VantaBg({ effect, className = "", options = {} }: VantaBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    let cancelled = false;

    const init = async () => {
      const THREE = await import("three");

      if (cancelled || !containerRef.current) return;

      const baseOptions = {
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        ...options,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let vantaInstance: any = null;

      switch (effect) {
        case "net": {
          const { default: NET } = await import("vanta/dist/vanta.net.min");
          if (!cancelled) {
            vantaInstance = NET({
              ...baseOptions,
              color: options.color ?? 0x3b82f6,
              backgroundColor: options.backgroundColor ?? 0x0f172a,
              points: options.points ?? 12.0,
              maxDistance: options.maxDistance ?? 22.0,
              spacing: options.spacing ?? 18.0,
            });
          }
          break;
        }
        case "waves": {
          const { default: WAVES } = await import("vanta/dist/vanta.waves.min");
          if (!cancelled) {
            vantaInstance = WAVES({
              ...baseOptions,
              color: options.color ?? 0x1e40af,
              backgroundColor: options.backgroundColor ?? 0x0f172a,
              shininess: options.shininess ?? 30,
              waveHeight: options.waveHeight ?? 15.0,
              waveSpeed: options.waveSpeed ?? 0.7,
              zoom: options.zoom ?? 0.75,
            });
          }
          break;
        }
        case "cells": {
          const { default: CELLS } = await import("vanta/dist/vanta.cells.min");
          if (!cancelled) {
            vantaInstance = CELLS({
              ...baseOptions,
              color1: options.color1 ?? 0x1e40af,
              color2: options.color2 ?? 0x3b82f6,
              backgroundColor: options.backgroundColor ?? 0x0f172a,
              size: options.size ?? 2.0,
              speed: options.speed ?? 1.0,
            });
          }
          break;
        }
        case "globe": {
          const { default: GLOBE } = await import("vanta/dist/vanta.globe.min");
          if (!cancelled) {
            vantaInstance = GLOBE({
              ...baseOptions,
              color: options.color ?? 0x3b82f6,
              backgroundColor: options.backgroundColor ?? 0x0f172a,
              points: options.points ?? 12.0,
              maxDistance: options.maxDistance ?? 20.0,
              spacing: options.spacing ?? 15.0,
            });
          }
          break;
        }
      }

      if (!cancelled) {
        vantaRef.current = vantaInstance;
        setLoaded(true);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}
