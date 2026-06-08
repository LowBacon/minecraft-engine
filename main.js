import { initRenderer } from "./engine/renderer.js";
import { setupControls } from "./engine/controls.js";
import { player, updatePlayer } from "./engine/player.js";
import { updateChunks, rebuildChunks } from "./engine/chunks.js";
import { initHotbar } from "./engine/inventory.js";
import { handleMouse } from "./engine/raycast.js";

export let scene, camera, renderer;

({ scene, camera, renderer } = initRenderer());

setupControls(camera);
initHotbar();
handleMouse(camera);

function loop(){
  requestAnimationFrame(loop);

  updatePlayer();
  updateChunks(scene, player.pos);
  rebuildChunks(scene);

  camera.position.copy(player.pos);

  renderer.render(scene,camera);
}
loop();
