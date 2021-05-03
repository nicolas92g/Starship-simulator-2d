let starship = new Starship();

//vars 
let numberOfFrames = 0;
let time = new Date();
let sky = new Sky();
let keysText = true;

//update display
let speed = 0;
let fps = 0;
setInterval(() => {
    speed = Math.round(starship.getSpeed());
    fps = Math.floor(1 / (starship.delta));
}, 200);

setInterval(() => {
    keysText = false;
}, 5000);

//zoom
ctx.scale(1,1);

//animation 
function animate(){
    canvas.focus();

    ctx.clearRect(0,0, canvas.width, canvas.height);

    
    ctx.save();
    
    //starship draw
    starship.update();
    ctx.scale(zoom, zoom);
    if(starship.pos.y < (canvas.height/4)){
        yOffset = starship.pos.y;

        
        
        starship.draw(starship.pos.x, canvas.height/4);
    }
    else{
        yOffset = canvas.height/4;
        
        starship.draw(starship.pos.x, starship.pos.y);
    }
    ctx.restore();

    //sky
    sky.update();
    ctx.save();
    ctx.scale(zoom, zoom);
    sky.draw();
    ctx.restore();

    //ground
    if(starship.getAltitude() <= canvas.height){
        ctx.save();
        ctx.scale(zoom,zoom);
        ctx.beginPath();
        ctx.fillStyle = "rgb(255,255,100)";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.rect(0, canvas.height - bottomOffset - yOffset + (canvas.height/4), canvas.width, bottomOffset);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        
    }

    //speed display
    ctx.font = "30px Arial";
    ctx.scale(1, 1);

    //text
    textWithBackground(String(Math.round(speed * 3.6)) + " Km/h" , 20, 40);
    textWithBackground("altitude : " + String(Math.round(starship.getAltitude())) + " m" , 20, 80);
    textWithBackground("fps : " + String(fps) , 20, 120);
    if(keysText)
        textWithBackground("space to turn on raptors, 1,2 and 3 (or &, é, \") to choose how many raptors to turn on, q and d to turn left and right" , 20, canvas.height - 10);

    numberOfFrames++;
    requestAnimationFrame(animate);
}

//start animation recursive loop
animate();


