import {TimelineMax} from 'gsap';
import './lib/gsapArray';



var numPoints = 14;

var points = [];
var points1 = [];
var startPoints = [];
var startPoints0 = [];
var endPoints = [];

for (var i = 0; i < numPoints; i++) {
  points.push(
    20+Math.random()*10
  );
  startPoints.push(0);
  endPoints.push(100 + Math.random()*50);
  startPoints0.push(-Math.random()*100);
}

let startPoints1 = startPoints.slice(0);
let startPoints2 = startPoints0.slice(0);
let startPoints3 = startPoints0.slice(0);
let startPoints4 = startPoints0.slice(0);
points.forEach((el,index) => {
  points1.push(points[index] - 4);
});

function draw(path,points,closed) {


  let str = '';
  if(closed) {
  	str += ` M 0 0 V ${points[0]}` ;
  } else{
  	str += ` M 0 ${points[0]}` ;
  }
  
  for (var i = 0; i < numPoints-1; i++) {
	  var p = (i+1)/(numPoints -1)*100;
	  var cp = p - (1/(numPoints -1)*100)/2;
	  // Bezier Curve generation
	  str += `C ${cp} ${points[i]} ${cp} ${points[i+1]} ${p} ${points[i+1]}`;
  }
  if(closed) str += 'V 0 H 0';
  path.setAttribute('d',str);
}



let path01 = document.querySelectorAll('.waves__01')[0];
let path02 = document.querySelectorAll('.waves__02')[0];
let path03 = document.querySelectorAll('.waves__03')[0];

export default function TimeLine() {
  let tl = new TimelineMax({onComplete: function() {
    startPoints0 = startPoints.slice(0);
    startPoints2 = startPoints.slice(0);
    startPoints3 = startPoints.slice(0);
    draw(path01,startPoints0,1);
    draw(path02,startPoints2,1);
    draw(path03,startPoints3,1);
  }});
  console.log(startPoints1,endPoints,'start');
  tl
    .to(startPoints0,1,{endArray:endPoints,onUpdate:function() {
      draw(path01,startPoints0,1);
    }})
    .to(startPoints2,1,{endArray:endPoints,onUpdate:function() {
      draw(path02,startPoints2,1);
    }},'-=0.6')
    .to(startPoints3,1,{endArray:endPoints,onUpdate:function() {
      draw(path03,startPoints3,1);
    }},'-=0.6');
  return tl;
}









