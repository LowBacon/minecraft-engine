import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";

export const BLOCK = {
    AIR:0,
    GRASS:1,
    DIRT:2,
    STONE:3,
};

export const GEO = new THREE.BoxGeometry(1,1,1);

export const MATERIALS = {
    1: new THREE.MeshLambertMaterial({color:0x4ade80}),
    2: new THREE.MeshLambertMaterial({color:0x92400e}),
    3: new THREE.MeshLambertMaterial({color:0x888888}),
};
