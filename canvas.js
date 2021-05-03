//canvas 
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//set a default resolution just in case
canvas.width = 800;
canvas.height = 500;
//set the size of the canvas
canvas.style.width = "100vw";
canvas.style.height = "100vh";

//viewport resolution update
function updateViewportResolution() {
    //get the current canvas size in pixel
    const {width, height} = canvas.getBoundingClientRect();
    //update Resolution of the viewport to the canvas' size
    canvas.width = width;
    canvas.height = height;
}

//viewport updates loop
setInterval(updateViewportResolution, 20);


// //inputs treatement

// const mouse = {
//     x: canvas.width/2,
//     y: canvas.height/2,
//     click: false,
//     clientX: 0,
//     clientY:0
// }

// canvas.addEventListener("mousedown", (event) => {
//     mouse.click = true;
//     mouse.x = event.layerX;
//     mouse.y = event.layerY;
//     //console.log(mouse.x,mouse.y);
// });

// canvas.addEventListener("mouseup", (event) => {
//     mouse.click = false;
// });

// canvas.addEventListener("mousemove", (event) => {
//     mouse.clientX = event.layerX;
//     mouse.clientY = event.layerY;
// });

const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
    numberOfRaptors: 3
}

canvas.addEventListener("keyup", (event) => {
    switch(event.code){
        case "Space":
            //keys.space = false;
            break;
        case "KeyW":
            keys.forward = false;
            break;
        case "KeyS":
            keys.backward = false;
            break;
        case "KeyA":
            keys.left = false;
            break;
        case "KeyD":
            keys.right = false;
            break;
        case "KeyI":
            console.log(starship);
            break;
        default:
            //console.log("this key is useless :(");  
            break;
    }
});

canvas.addEventListener("keydown", (event) => {
    switch(event.code){
        case "Space":
            keys.space = !keys.space;
            break;
        case "KeyW":
            keys.forward = true;
            break;
        case "KeyS":
            keys.backward = true;
            break;
        case "KeyA":
            keys.left = true;
            break;
        case "KeyD":
            keys.right = true;
            break;
        case "Digit1":
            keys.numberOfRaptors = 1;
            break;
        case "Digit2":
            keys.numberOfRaptors = 2;
            break;
        case "Digit3":
            keys.numberOfRaptors = 3;
            break;
        default:
            //console.log(event);
            break;
    }
});

//zoom
let zoom = 1;
canvas.addEventListener("wheel", (event) => {
    zoom -= event.deltaY / 2000;
    if(zoom < 1)
        zoom = 1;
    else if (zoom > 5)
        zoom = 5;
    console.log("zoom = " + zoom);
})

function textWithBackground(text, x, y){
    ctx.beginPath();
    
    let textMetric = ctx.measureText(text);
    const height = textMetric.actualBoundingBoxAscent;
    const OFFSET = height/6;
    ctx.fillStyle = "rgba(0,0,0, 0.3)";
    ctx.strokeStyle = "rgba(0,0,0, 0)";
    ctx.lineWidth = 3;
    
    ctx.rect(x - OFFSET,y - height - OFFSET, textMetric.width + OFFSET * 2, height + OFFSET * 2);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);

}

function ObjectSetAllProperties(object, property){
    const properties = Object.getOwnPropertyNames(object);
    properties.forEach(element => {
        Object.defineProperty(object, element, property);
    });
}

function mapInRange(number, min, max, minWanted, maxWanted){
    return (number-min)/(max-min) * (maxWanted-minWanted) + minWanted;
}