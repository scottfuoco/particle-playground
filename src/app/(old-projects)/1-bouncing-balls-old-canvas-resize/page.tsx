"use client";

import Canvas from "./canvas/Canvas";
import Head from "next/head";
import { useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Head>
        <title>Bouncing Balls</title>
        <meta name="description" content="Bouncing Balls" />
      </Head>
      <main className="h-screen">
        <Canvas ref={canvasRef} />
      </main>
    </>
  );
}
