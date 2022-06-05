// p5jsのスケッチを作る
let mySketch = p => {
    let bg;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        bg = p.createGraphics(p.width, p.height);
        bg.colorMode(p.HSB, 100);
        bg.noStroke();
        for(let i = 0; i < 100; i++){
            bg.fill(5, i/2, 100);
            bg.rect(0, bg.height*i/100, bg.width, bg.height/100);
        }
    }
    p.draw = () => {
        p.image(bg, 0, 0);
    }
};

if(document.getElementById("sketchArea0")){
    new p5(mySketch, "sketchArea0");
}