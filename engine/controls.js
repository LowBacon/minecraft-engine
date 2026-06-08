import { yaw } from "./player.js";

export function setupControls(camera) {

    let pitch = 0;

    const canvas = document.getElementById("game");

    canvas.onclick = () => canvas.requestPointerLock();

    document.addEventListener("mousemove", e => {
        if (document.pointerLockElement !== canvas) return;

        // ✅ THIS updates SAME yaw
        yaw -= e.movementX * 0.002;
        pitch -= e.movementY * 0.002;

        pitch = Math.max(-1.5, Math.min(1.5, pitch));

        camera.rotation.set(pitch, yaw, 0, "YXZ");
    });
}
