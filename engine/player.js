import { getHeight } from "./worldgen.js";

export const player = {
    pos:new THREE.Vector3(0,60,0),
    vel:new THREE.Vector3(),
    grounded:false
};

let keys = {};

window.addEventListener("keydown",e=>keys[e.code]=true);
window.addEventListener("keyup",e=>keys[e.code]=false);

export function updatePlayer(){

    let dx=0, dz=0;
    if(keys["KeyW"]) dz-=1;
    if(keys["KeyS"]) dz+=1;
    if(keys["KeyA"]) dx-=1;
    if(keys["KeyD"]) dx+=1;

    player.vel.x += dx*0.1;
    player.vel.z += dz*0.1;

    player.vel.x*=0.8;
    player.vel.z*=0.8;

    player.vel.y -= 0.01;

    if(keys["Space"] && player.grounded){
        player.vel.y=0.2;
        player.grounded=false;
    }

    player.pos.add(player.vel);

    let ground = getHeight(player.pos.x,player.pos.z)+2;

    if(player.pos.y < ground){
        player.pos.y = ground;
        player.vel.y = 0;
        player.grounded=true;
    }
}
