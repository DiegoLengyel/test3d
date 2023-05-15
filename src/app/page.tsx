import RenderResult from 'next/dist/server/render-result';
import Image from 'next/image'
import styles from './page.module.css'
"use client";
import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom';
import { Scene, PerspectiveCamera, WebGL1Renderer, Camera, Mesh, MeshBasicMaterial, BoxGeometry} from "three"


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

      //mover camara
      camera.position.z = 6

      //crear cubo
      const geometria = new BoxGeometry(1,1,1)
      const material = new MeshBasicMaterial({color: 0xffffff})
      const cubo = new Mesh (geometria,material)
      scene.add(cubo)


      renderer.setSize(window.innerWidth, window.innerHeight)
      const animate = () => {
        // Aquí puedes realizar las operaciones de animación de tu escena
        cubo.rotation.x += 0.01
        cubo.rotation.y += 0.01
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
