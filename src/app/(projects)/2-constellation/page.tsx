"use client";

import Canvas from "../../../components/Canvas";
import Head from "next/head";
import { useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Head>
        <title>Constellations</title>
      </Head>
      <main className="h-screen">
        <Canvas className="bg-slate-500" ref={canvasRef} />
      </main>
    </>
  );
}
