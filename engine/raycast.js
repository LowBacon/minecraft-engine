import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";
import { getSelectedBlock } from "./inventory.js";

const raycaster = new THREE.Raycaster();

export function handleMouse(camera){

  window.addEventListener("mousedown", e => {

    raycaster.setFromCamera(new THREE.Vector2(0,0), camera);

    // simplified (expand later)
    console.log("Clicked block");
  });
}
