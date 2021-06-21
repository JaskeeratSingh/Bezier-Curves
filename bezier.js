let points = [];
todraw = false;
let travelTime = 120;
let P0s=[];
let P1s=[];
let scalee = [];
let V_dist=[];
let d = [];
let min = [100,100];
let minq=100;
let a,b;
let scaleeq=0;
let result = [];

function setup(){
    cnv = createCanvas(600, 600);
    centerCanvas();
    background(0);
}

function mousePressed(){
    let xs = map(mouseX, 0, width, 0, 1);
    let ys = map(mouseY, 0, height, 1, 0);
    points.push([xs,ys]);
}

function draw(){
    background(0);
    stroke(255);
    for(let i = 0; i< points.length; i++){
        let px = map(points[i][0], 0,1,0,width);
        let py = map(points[i][1], 0,1,height,0);
        strokeWeight(8);
        point(px,py);
        if(i<points.length-1){
            let ppx = map(points[i+1][0], 0,1,0,width);
            let ppy = map(points[i+1][1], 0,1,height,0);
            strokeWeight(2);
            line(px,py,ppx,ppy);
        }
    }
    if(todraw){

        strokeWeight(2);
        stroke(255,0,0);
        let p0x=map(P0s[0].x, 0,1,0,width)
        let p0y=map(P0s[0].y, 0,1,height,0);
        let p1x=map(P0s[1].x, 0,1,0,width)
        let p1y=map(P0s[1].y, 0,1,height,0);

        line(p0x,p0y,p1x,p1y);




        strokeWeight(4);
        stroke(0,255,0);

        for(i=1;i<result.length;i++){
            line(result[i][0],result[i][1],result[i-1][0],result[i-1][1]); 
        }

        for(i=0;i<P0s.length;i++){
            let P0check = p5.Vector.add(P0s[i], V_dist[i]);
            let dd=P0check.dist(P1s[i]);
            if(dd<min[i]){
                min[i]=dd;
                P0s[i] = P0check;
            }
            stroke(255,0,0);
            strokeWeight(12);
            let pppx = map(P0s[i].x, 0,1,0,width);
            let pppy = map(P0s[i].y, 0,1,height,0);
            point(pppx, pppy);

            a.set(p0x,p0y)
            b.set(p1x,p1y)

            let dq=1/(2*travelTime);
            //let V_distq=(p5.Vector.sub(b, a).normalize()).mult(scaleeq);
            let V_distq=(p5.Vector.sub(b, a).mult(scaleeq));
            //drawArrow(a, V_distq, 'red');
            //            let P0checkq = p5.Vector.add(a, V_distq);
            //            let ddq=P0checkq.dist(b);
            let x = (((createVector(points[1][0],points[1][1])).dist(createVector(points[2][0],points[2][1])))*600)//p5.Vector.sub(P1s[1], P0s[1]).mag());
            //console.log(V_distq.mag()-x);
            if(V_distq.mag()-x<0){
                scaleeq=scaleeq+((dq));
                a = p5.Vector.add(a, V_distq);
            }else{
                a = p5.Vector.add(a, V_distq)
            }
            stroke(0,255,0);
            strokeWeight(12);
            point(a.x, a.y);
            result.push([a.x,a.y]);
            //point(b.x, b.y);
        }

    }

}


function centerCanvas(){
    var x = (windowWidth - width) / 2;
    cnv.position(x, 50);
}


function Bezier(){
    let startpoints = points.slice(0,points.length-1);
    let endpoints=points.slice(1,points.length);
    for(let i = 0; i<startpoints.length; i++){
        P0s.push(createVector(startpoints[i][0],startpoints[i][1]));
        P1s.push(createVector(endpoints[i][0],endpoints[i][1]));
    }
    for(i=0;i<P0s.length;i++){
        d.push(P0s[i].dist(P1s[i]));
        scalee.push((d[i])/travelTime);
        V_dist.push((p5.Vector.sub(P1s[i], P0s[i]).normalize()).mult(scalee[i]));
    }
    a=createVector(0,0);
    b=createVector(0,0);
    todraw = true;
}

//function setup() {
//    createCanvas(400, 200);
//
//    P0 = createVector(50, 50);
//    P1 = createVector(350, 150);
//
//    startTime = millis();
//    endTime = startTime + 3000; // 3 seconds
//}

//function start(P0, P1) {
//
//    let scale = (P0.dist(P1))/travelTime;
//
//    let V_dist = p5.Vector.sub(P1, P0).mult(scale);
//    let PX = p5.Vector.add(P0, V_dist);
//
//    background(0);
//    fill((255,0,0));
//    strokeWeight(3);
//    ellipse(PX.x, PX.y, 15, 15);
//}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}