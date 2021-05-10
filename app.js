'use strict';

const canvas = document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
//canvas.width=getElementByClassName("canvas")[0].offsetWidth;
//canvas.height=getElementByClassName("canvas")[0].offsetHeight;
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const canvasSize=450;
const initialColor="#2c2c2c";

ctx.fillStyle="white";
ctx.fillRect(0,0,canvasSize,canvasSize);
ctx.strokeStyle=initialColor;
ctx.fillStyle=initialColor;
ctx.lineWidth=1.5;

let painting =false;
let filling=false;

function startPainting(){
    painting= true;
}

function stopPainting(){
    painting=false;
}
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if (filling==true){
        filling=false;
        mode.innerText="Fill";
    }
    else
    {
        filling=true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
        if (filling==true)
        {
            ctx.fillRect(0,0,canvasSize,canvasSize);
        }
    }
    

function handleSaveClick(){
    const image=canvas.toDataURL("image/png");
    const link=document.createElement("a");
    link.href=image;
    link.download="🎨paint";
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    //canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color=>
    color.addEventListener("click", handleColorClick));

if (range){
    range.addEventListener("input",handleRangeChange);
}

if (mode){
    mode.addEventListener("click",handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}