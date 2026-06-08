import { initRenderer } from "./engine/renderer.js";
import { player, updatePlayer } from "./engine/player.js";
import { setupControls } from "./engine/controls.js";
import { updateChunks } from "./engine/chunks.js";

const { scene, camera, renderer } = initRenderer();

setupControls(camera);

function loop() {
    requestAnimationFrame(loop);

    updatePlayer();

    // ✅ generate world
    updateChunks(scene);

    camera.position.copy(player.pos);

    renderer.render(scene, camera);
}

loop();
