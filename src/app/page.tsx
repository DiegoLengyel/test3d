import RenderResult from 'next/dist/server/render-result';
import Image from 'next/image';
import styles from './page.module.css';
"use client";
import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { Scene, PerspectiveCamera, WebGL1Renderer, Mesh, SphereGeometry, TextureLoader, BackSide, MeshPhongMaterial, HemisphereLight, AmbientLight } from 'three';

export default function Home() {
  const canvasRef = useRef(null);
  const cubeRef = useRef<Mesh>();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const renderer = new WebGL1Renderer({ antialias: true, canvas });
      const scene = new Scene();
      const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

      // Mover cámara
      camera.position.z = 6;

      // Crear cubo
      createCube(scene);

      // Crear skybox
      createSkybox(scene);

      // Crear iluminación
      createLights(scene);

      // Renderizar el sitio
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Animar las cosas
      const animate = () => {
        if (cubeRef.current) {
          cubeRef.current.rotation.x += 0.01;
          cubeRef.current.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  //Funciones de creación
  const createCube = (scene: Scene) => {
    const cubeGeometry = new SphereGeometry(1, 32, 32);
    const cubeMaterial = new MeshPhongMaterial({ color: 0xf07857 });
    cubeRef.current = new Mesh(cubeGeometry, cubeMaterial);
    scene.add(cubeRef.current);
  };

  const createSkybox = (scene: Scene) => {
    const skyGeometry = new SphereGeometry(360, 25, 25);
    const loader = new TextureLoader();
    const texture = loader.load('/custom-sky.png');
    const material2 = new MeshPhongMaterial({
      map: texture,
    });
    const skybox = new Mesh(skyGeometry, material2);
    skybox.material.side = BackSide;
    scene.add(skybox);
  };

  const createLights = (scene: Scene) => {
    scene.add(new AmbientLight(0xffffff, 0.8));
    scene.add(new HemisphereLight(0xffffff, 0.8));
  };

  return <canvas ref={canvasRef} id="bg" />;
}
