export let seed = 1337;

export function rand(x,z,y=0){
    let s = Math.sin(x*12.9898 + z*78.233 + y*37.719 + seed)*43758.5453;
    return s - Math.floor(s);
}

export function getHeight(x,z){
    return Math.floor(
        40 + Math.sin(x*0.05)*6 + Math.cos(z*0.05)*6
    );
}
