import * as THREE from "three";
import { BLOCK, GEO, MATERIALS } from "./blocks.js";
import { getHeight } from "./worldgen.js";
import { scene } from "../main.js";

const CHUNK_SIZE = 16;

const chunks = new Map();
const dirty = new Set();

const dummy = new THREE.Object3D();

function key(x,z){ return x+","+z; }

export function updateChunks(pos){

    const cx = Math.floor(pos.x / CHUNK_SIZE);
    const cz = Math.floor(pos.z / CHUNK_SIZE);

    for(let dx=-2;dx<=2;dx++){
        for(let dz=-2;dz<=2;dz++){

            const k = key(cx+dx,cz+dz);

            if(!chunks.has(k)){
                const blocks = generateChunk(cx+dx,cz+dz);
                const mesh = buildChunk(cx+dx,cz+dz,blocks);
                chunks.set(k,{blocks,mesh,cx:cx+dx,cz:cz+dz});
            }
        }
    }
}

function generateChunk(cx,cz){

    const blocks = new Map();

    for(let x=0;x<CHUNK_SIZE;x++){
        for(let z=0;z<CHUNK_SIZE;z++){

            const wx = cx*CHUNK_SIZE+x;
            const wz = cz*CHUNK_SIZE+z;

            const h = getHeight(wx,wz);

            for(let y=0;y<=h;y++){

                let id = y===h ? BLOCK.GRASS :
                         y>h-3 ? BLOCK.DIRT :
                         BLOCK.STONE;

                blocks.set(`${wx},${y},${wz}`,id);
            }
        }
    }

    return blocks;
}

function buildChunk(cx,cz,blocks){

    const group = new THREE.Group();
    const batches = {1:[],2:[],3:[]};

    blocks.forEach((id,pos)=>{
        const [x,y,z]=pos.split(',').map(Number);
        batches[id]?.push({x,y,z});
    });

    for(let id in batches){

        const list = batches[id];
        if(!list.length) continue;

        const mesh = new THREE.InstancedMesh(GEO, MATERIALS[id], list.length);

        for(let i=0;i<list.length;i++){
            dummy.position.set(list[i].x,list[i].y,list[i].z);
            dummy.updateMatrix();
            mesh.setMatrixAt(i,dummy.matrix);
        }

        mesh.instanceMatrix.needsUpdate=true;
        group.add(mesh);
    }

    scene.add(group);
    return group;
}

export function rebuildDirtyChunks(){
    dirty.forEach(k=>{
        const c = chunks.get(k);
        if(!c) return;

        scene.remove(c.mesh);
        c.mesh = buildChunk(c.cx,c.cz,c.blocks);
    });

    dirty.clear();
}