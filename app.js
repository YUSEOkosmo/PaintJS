const canvas = document.getElementById("jsCan");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const initialColor = "black";
const saveButton = document.getElementById("jsSave");
const clearButton = document.getElementById("jsClear");

canvas.width = 800;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,800,700);  
ctx.strokeStyle = initialColor;
ctx.fillStyle = initialColor;
ctx.lineWidth = 2.5;



let painting = false;
let filling  = false;
function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}
function onMouseMove(event){
    
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting == false){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }

}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = ctx.strokeStyle;
}

function handleBrushSize(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleMode(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill";
        mode.style.backgroundColor = "white";
    } else {
        filling = true;
        mode.innerText = "Paint";
        mode.style.backgroundColor = "blue";
    }

}
function handleCanvasClick(){
    if(filling == true){
        
        ctx.fillRect(0,0,800,700);  
    }
}   

function handleMenu(event){
    event.preventDefault();
    
}
function handleSave(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image
    link.download = "PaintJS[EXPORT]";

    link.click();
}
if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleMenu);    
}

if(colors){
    
    Array.from(colors).forEach(color => color.addEventListener("click", changeColor));
}

if(range){
    range.addEventListener("input", handleBrushSize);
}

if(mode){
    mode.addEventListener("click", handleMode);
}

if(saveButton){
    saveButton.addEventListener("click", handleSave);
}