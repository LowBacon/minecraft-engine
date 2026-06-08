import { getHeight } from "./worldgen.js";

export const player = {
  pos:new THREE.Vector3(0,70,0),
  vel:new THREE.Vector3(),
  grounded:false
};

let keys = {};
let yaw = 0;

window.addEventListener("keydown",e=>keys[e.code]=true);
window.addEventListener("keyup",e=>keys[e.code]=false);

export function updatePlayer(){

  let speed = keys["ShiftLeft"] ? 0.18 : 0.1;

  let dx=0,dz=0;
  if(keys["KeyW"]) dz-=1;
  if(keys["KeyS"]) dz+=1;
  if(keys["KeyA"]) dx-=1;
  if(keys["KeyD"]) dx+=1;

  const forwardX = -Math.sin(yaw);
  const forwardZ = -Math.cos(yaw);
  const rightX = Math.cos(yaw);
  const rightZ = -Math.sin(yaw);

  player.vel.x += (forwardX*dz + rightX*dx)*0.05;
  player.vel.z += (forwardZ*dz + rightZ*dx)*0.05;

  player.vel.x *= 0.8;
  player.vel.z *= 0.8;

  player.vel.y -= 0.01;

  if(keys["Space"] && player.grounded){
    player.vel.y = 0.22;
    player.grounded=false;
  }

  player.pos.add(player.vel);

  let g = getHeight(player.pos.x,player.pos.z)+2;
  if(player.pos.y < g){
    player.pos.y=g;
    player.vel.y=0;
    player.grounded=true;
  }
}
