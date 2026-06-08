import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";
import { getHeight } from "./worldgen.js";

const geo = new THREE.BoxGeometry(1, 1, 1);

const grass = new THREE.MeshLambertMaterial({ color: 0x4ade80 });
const dirt = new THREE.MeshLambertMaterial({ color: 0x92400e });
const stone = new THREE.MeshLambertMaterial({ color: 0x777777 });

let generated = false;

export function updateChunks(scene) {

    if (generated) return;

    const size = 40;

    const meshG = new THREE.InstancedMesh(geo, grass, 50000);
    const meshD = new THREE.InstancedMesh(geo, dirt, 50000);
    const meshS = new THREE.InstancedMesh(geo, stone, 50000);

    let ig = 0, id = 0, is = 0;

    for (let x = -size; x < size; x++) {
        for (let z = -size; z < size; z++) {

            const h = getHeight(x, z);

            for (let y = 0; y <= h; y++) {

                const m = new THREE.Matrix4();
                m.setPosition(x, y, z);

                if (y === h) meshG.setMatrixAt(ig++, m);
                else if (y > h - 3) meshD.setMatrixAt(id++, m);
                else meshS.setMatrixAt(is++, m);
            }
        }
    }

    meshG.count = ig;
    meshD.count = id;
    meshS.count = is;

    scene.add(meshG, meshD, meshS);

    generated = true;
}
