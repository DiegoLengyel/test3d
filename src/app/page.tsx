import RenderResult from 'next/dist/server/render-result';
import Image from 'next/image';
import styles from './page.module.css';
"use client";
import React, { useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { Scene, PerspectiveCamera, WebGL1Renderer, Mesh, SphereGeometry, TextureLoader, BackSide, MeshPhongMaterial, HemisphereLight, AmbientLight, Group } from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"


export default function Home() {
  const canvasRef = useRef(null);
  const cubeRef = useRef<Mesh>();
  const modelRef = useRef<Group>();
  

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const renderer = new WebGL1Renderer({ antialias: true, canvas });
      const scene = new Scene();
      const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); 

      // Mover cámara
      camera.position.z = 1;

      // Crear cubo
      //createCube(scene);

      // Crear skybox
      createSkybox(scene);

      // Crear iluminación
      createLights(scene);

      //Cargar modelos
      loadModel(scene);

      // Renderizar el sitio
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Función de ajuste al redimensionar la ventana
      const resize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      // Llamar a la función resize al cargar la página
      resize();

      // Llamar a la función resize al redimensionar la ventana
      window.addEventListener('resize', resize);

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

  const loadModel = (scene: Scene) => {
    const loader = new GLTFLoader();
  
    loader.load('/logo.glb', (gltf) => {
      const model = gltf.scene;
  
      // Configura la posición, escala u otras configuraciones adicionales del modelo si es necesario
      model.position.set(5, 5, 5);
      model.scale.set(100, 100, 100);
  
      scene.add(model);
    });
  };

  return <canvas ref={canvasRef} id="bg" />;
}
