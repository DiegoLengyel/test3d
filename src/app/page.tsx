import RenderResult from 'next/dist/server/render-result';
import Image from 'next/image'
import styles from './page.module.css'
"use client";
import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom';
import { Scene, 
  PerspectiveCamera,
  WebGL1Renderer,
  Camera,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  SphereGeometry,
  TextureLoader,
  BackSide,
  MeshPhongMaterial,
  DirectionalLight,
  HemisphereLight,
  AmbientLight} from "three"


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

      //crear SkyBox
      const Skygeometry = new SphereGeometry(360, 25, 25)
      const loader = new TextureLoader()
      const texture = loader.load("/custom-sky.png")
      const material2 = new MeshPhongMaterial({
        map: texture
      })
      //skybox como tal
      const skybox = new Mesh(Skygeometry, material2)
      scene.add(skybox)
      skybox.material.side = BackSide
  
      //crear la iluminación
      scene.add(new AmbientLight(0xffffff, 0.8))
      scene.add(new HemisphereLight(0xffffff, 0.8))
      //Renderizar el sitio como tal
      renderer.setSize(window.innerWidth, window.innerHeight)
      //Animar las cosas
      const animate = () => {
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
