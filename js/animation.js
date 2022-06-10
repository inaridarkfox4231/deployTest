function createP5Sketch(sketch, id){
    if(!document.getElementById(id)){ return; }
    new p5(sketch, id);
}

createP5Sketch(p => {
    let points = [];
    let hue = 0;
    const SQ3DIV4 = Math.sqrt(3)/4;
    // bulletLang3より借用
    const STAR_FACTOR = 2.618033988749895; // 1 + 2 * cos(36).
    // cosとsinの0, 72, 144, 216, 288における値
    const COS_PENTA = [1, 0.30901699437494745, -0.8090169943749473, -0.8090169943749473, 0.30901699437494745];
    const SIN_PENTA = [0, 0.9510565162951535, 0.5877852522924732, -0.587785252292473, -0.9510565162951536];
    let shapeName = "circle";
    let randomShapeFlag = false;
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noStroke();
        p.colorMode(p.HSB, 100);
        const btns = document.getElementsByClassName("configShape");
        const shapes = ["circle", "square", "triangle", "star"];
        for(let i = 0; i < 4; i++){
            btns[i].addEventListener("click", () => { shapeName = shapes[i]; randomShapeFlag = false; });
        }
        btns[4].addEventListener("click", () => { randomShapeFlag = true; })
    }
    p.draw = () => {
        p.clear();
        const dx = p.mouseX - p.pmouseX;
        const dy = p.mouseY - p.pmouseY;
        if(p.mag(dx, dy) > 2){
            createPoint(p.mouseX, p.mouseY, Math.random()*10-5, -8, 25);
        }
        updatePoints();
        drawPoints();
    }
    function createPoint(x, y, u, v, r){
        const h = hue;
        let shape = shapeName;
        if(randomShapeFlag){
            const seed = Math.floor(Math.random() * 4);
            shape = (seed == 0 ? "circle" : (seed == 1 ? "square" : (seed == 2 ? "triangle" : "star")));
        }
        if(shape == "triangle" || shape == "star"){ r *= 1.2; } // サイズ調整
        points.push({x, y, u, v, r, h, shape});
        hue = (hue+0.25) % 100;
    }
    function updatePoints(){
        for(let i=points.length-1; i>=0; i--){
            let pt = points[i];
            pt.x += pt.u;
            pt.y += pt.v;
            pt.v += 2;
            pt.r -= 0.25;
            if(pt.v > 6){ pt.v = 6; }
            if(pt.r < 0){ points.splice(i, 1); }
        }
    }
    function drawPoints(){
        for(let pt of points){
            p.fill(pt.h, pt.r*3, 100);
            if(pt.shape == "circle"){
                p.circle(pt.x, pt.y, pt.r);
            }else if(pt.shape == "square"){
                p.square(pt.x - pt.r * 0.5, pt.y - pt.r * 0.5, pt.r);
            }else if(pt.shape == "triangle"){
                p.triangle(pt.x - pt.r * SQ3DIV4, pt.y + pt.r / 4, pt.x + pt.r * SQ3DIV4, pt.y + pt.r / 4, pt.x, pt.y - pt.r / 2);
            }else if(pt.shape == "star"){
                // 星形を作る簡単なスクリプト
                const l = 0.5 * pt.r / STAR_FACTOR;
                let u = [];
                let v = [];
                for(let i = 0; i < 5; i++){
                    u.push([pt.x + 0.5 * pt.r * SIN_PENTA[i], pt.y - 0.5 * pt.r * COS_PENTA[i]]);
                }
                v.push(...[pt.x, pt.y + l]);
                p.triangle(u[1][0], u[1][1], u[4][0], u[4][1], v[0], v[1]);
                p.quad(u[0][0], u[0][1], u[2][0], u[2][1], v[0], v[1], u[3][0], u[3][1]);
            }
        }
    }
}, "bgAnime");