<div id = "bgAnime" style = "display: block; position: fixed; top: 0px; left: 0px; z-index: 1; pointer-events: none;"></div>
# Animationのテスト  
ソースコード：

```javascript title="bgAnimation.js"
function createP5Sketch(sketch, id){
    if(!document.getElementById(id)){ return; }
    new p5(sketch, id);
}

createP5Sketch(p => {
    let points = [];
    let hue = 0;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
        p.colorMode(p.HSB, 100);
    }
    p.draw = () => {
        p.clear();
        const dx = p.mouseX - p.pmouseX;
        const dy = p.mouseY - p.pmouseY;
        if(p.mag(dx, dy) > 2){
            createPoint(p.mouseX, p.mouseY, Math.random()*8-4, -8, 25);
        }
        updatePoints();
        drawPoints();
    }
    function createPoint(x, y, u, v, r){
        const h = hue;
        points.push({x, y, u, v, r, h});
        hue = (hue+1) % 100;
    }
    function updatePoints(){
        for(let i=points.length-1; i>=0; i--){
            let pt = points[i];
            pt.x += pt.u;
            pt.y += pt.v;
            pt.v += 2;
            pt.r -= 0.5;
            if(pt.v > 8){ pt.v = 8; }
            if(pt.r < 0){ points.splice(i, 1); }
        }
    }
    function drawPoints(){
        for(let pt of points){
            p.fill(pt.h, pt.r*3, 100);
            p.circle(pt.x, pt.y, pt.r);
        }
    }
}, "bgAnime");
```

## 説明
マウスの位置に円が現れます。色は出現するたびにカラフルに変化し時間経過で落ちていきます。色が白っぽくなります。
