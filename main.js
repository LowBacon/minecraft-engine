import { initRenderer } from "./engine/renderer.js";
import { updateChunks } from "./engine/chunks.js";
import { player, updatePlayer } from "./engine/player.js";
import { setupControls } from "./engine/controls.js";
import { rebuildDirtyChunks } from "./engine/chunks.js";

export let scene, camera, renderer;

({ scene, camera, renderer } = initRenderer());

setupControls(camera);

function loop() {
    requestAnimationFrame(loop);

    updatePlayer();
    updateChunks(player.pos);
    rebuildDirtyChunks();

    camera.position.copy(player.pos);

    renderer.render(scene, camera);
}

loop();