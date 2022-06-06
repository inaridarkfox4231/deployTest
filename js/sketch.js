// p5jsのスケッチを作る

function createP5Sketch(sketch, id){
    if(!document.getElementById(id)){ return; }
    new p5(sketch, id);
}

createP5Sketch(p => {
    let bg;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        bg = p.createGraphics(p.width, p.height);
        bg.colorMode(p.HSB, 100);
        bg.noStroke();
        for(let i = 0; i < 100; i++){
            bg.fill(5, 100, i/2);
            bg.rect(0, bg.height*i/100, bg.width, bg.height/100);
        }
    }
    p.draw = () => {
        p.image(bg, 0, 0);
    }
}, "sketchArea0");