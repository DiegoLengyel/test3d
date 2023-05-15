import RenderResult from 'next/dist/server/render-result';
import Image from 'next/image'
"use client";
//import styles from './page.module.css'
import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom';
import { Scene, PerspectiveCamera, WebGL1Renderer, Camera} from "three"

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const renderer = new WebGL1Renderer({
        antialias: true,
        canvas
      });
      const scene = new Scene();
      const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

      const animate = () => {
        // Aquí puedes realizar las operaciones de animación de tu escena
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);
  
  return (
    <canvas ref={canvasRef} id="bg" />
  )
}
