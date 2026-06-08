import * as THREE from "https://unpkg.com/three@0.152.2/build/three.module.js";
import { getHeight } from "./worldgen.js";

export const player = {
    pos: new THREE.Vector3(0, 40, 0),
    vel: new THREE.Vector3(),
    grounded: false
};

// ✅ shared rotation
export let yaw = 0;

let keys = {};

window.addEventListener("keydown", e => keys[e.code] = true);
window.addEventListener("keyup", e => keys[e.code] = false);

export function updatePlayer() {

    let dx = 0, dz = 0;

    // ✅ FIXED directions
    if (keys["KeyW"]) dz += 1;
    if (keys["KeyS"]) dz -= 1;
    if (keys["KeyA"]) dx -= 1;
    if (keys["KeyD"]) dx += 1;

    const forwardX = Math.sin(yaw);
    const forwardZ = Math.cos(yaw);
    const rightX = Math.cos(yaw);
    const rightZ = -Math.sin(yaw);

    player.vel.x += (forwardX * dz + rightX * dx) * 0.04;
    player.vel.z += (forwardZ * dz + rightZ * dx) * 0.04;

    // ✅ friction (Minecraft feel)
    player.vel.x *= 0.75;
    player.vel.z *= 0.75;

    // ✅ gravity
    player.vel.y -= 0.01;

    // ✅ jump
    if (keys["Space"] && player.grounded) {
        player.vel.y = 0.22;
        player.grounded = false;
    }

    player.pos.add(player.vel);

    const ground = getHeight(player.pos.x, player.pos.z) + 2;

    if (player.pos.y < ground) {
        player.pos.y = ground;
        player.vel.y = 0;
        player.grounded = true;
    }
}
``
