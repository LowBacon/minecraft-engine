import { getHeight } from "./worldgen.js";
import { GEO, MATERIALS } from "./blocks.js";

const chunks=new Map();
const dirty=new Set();

const dummy=new THREE.Object3D();
const SIZE=16;

function key(x,z){return x+","+z;}

export function updateChunks(scene,pos){

  const cx=Math.floor(pos.x/SIZE);
  const cz=Math.floor(pos.z/SIZE);

  for(let dx=-2;dx<=2;dx++){
    for(let dz=-2;dz<=2;dz++){

      let k=key(cx+dx,cz+dz);

      if(!chunks.has(k)){
        let b=generate(cx+dx,cz+dz);
        let m=build(scene,cx+dx,cz+dz,b);
        chunks.set(k,{b,m,cx:cx+dx,cz:cz+dz});
      }
    }
  }
}

function generate(cx,cz){
  let m=new Map();

  for(let x=0;x<SIZE;x++){
    for(let z=0;z<SIZE;z++){

      let wx=cx*SIZE+x;
      let wz=cz*SIZE+z;
      let h=getHeight(wx,wz);

      for(let y=0;y<=h;y++){
        m.set(`${wx},${y},${wz}`,1);
      }
    }
  }
  return m;
}

function build(scene,cx,cz,blocks){

  let mesh=new THREE.InstancedMesh(GEO,MATERIALS[1],blocks.size);

  let i=0;
  blocks.forEach((_,k)=>{
    let [x,y,z]=k.split(",").map(Number);
    dummy.position.set(x,y,z);
    dummy.updateMatrix();
    mesh.setMatrixAt(i++,dummy.matrix);
  });

  mesh.count=i;

  scene.add(mesh);
  return mesh;
}

export function rebuildChunks(scene){
  dirty.clear();
}
``
