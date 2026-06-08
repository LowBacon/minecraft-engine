const blocks = [1,2,3,4,1,2,3,4,1];
let selected = 0;

export function initHotbar(){

  const bar = document.getElementById("hotbar");

  blocks.forEach((b,i)=>{
    const slot = document.createElement("div");
    slot.className="slot";
    if(i===0) slot.classList.add("selected");

    slot.onclick=()=>select(i);

    bar.appendChild(slot);
  });

  window.addEventListener("wheel",e=>{
    if(e.deltaY>0) selected=(selected+1)%9;
    else selected=(selected+8)%9;
    updateUI();
  });
}

function select(i){
  selected=i;
  updateUI();
}

function updateUI(){
  const slots=document.querySelectorAll(".slot");
  slots.forEach((s,i)=>{
    s.classList.toggle("selected",i===selected);
  });
}

export function getSelectedBlock(){
  return blocks[selected];
}
``
