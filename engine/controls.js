export function setupControls(camera){

    let yaw=0, pitch=0;

    const canvas = document.getElementById("game");

    canvas.onclick = ()=>canvas.requestPointerLock();

    document.addEventListener("mousemove",e=>{
        if(document.pointerLockElement!==canvas) return;

        yaw -= e.movementX*0.002;
        pitch -= e.movementY*0.002;

        pitch=Math.max(-1.5,Math.min(1.5,pitch));

        camera.rotation.set(pitch,yaw,0,"YXZ");
    });
}
