import * as THREE from "three";

export function initRenderer(){

    const canvas = document.getElementById("game");

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth,window.innerHeight);

    const scene = new THREE.Scene();
    scene.background=new THREE.Color(0x87CEEB);
    scene.fog=new THREE.FogExp2(0x87CEEB,0.015);

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth/window.innerHeight,
        0.1,
        300
    );

    scene.add(new THREE.AmbientLight(0xffffff,0.7));

    const sun = new THREE.DirectionalLight(0xffffff,1.2);
    sun.position.set(50,100,50);
    scene.add(sun);

    return {scene,camera,renderer};
}
