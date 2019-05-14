//////////////////////////////////////////////////////////////
var canvas = document.getElementById("canvas");
var gl = canvas.getContext('webgl');
canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST); 
var view = LookAt(0, 0, 5, 0, 0, 0, 0, 1, 0); 
var proj = SetPerspective(45, canvas.width / canvas.height, 0.01, 100);
var VPMatrix = multiply(view, proj);
/////////////////////////////////////////////////////////////
var rotate = rotateX(0);
var drag = new Drag(canvas);
var plane = new Plane(gl);
createTexture(gl);
plane.draw(VPMatrix);
var time = 1.0; 

function tick(){
	time+=0.1;
  if(drag.dlength){
  	
	rotate = multiply(rotate, rotateAxis(-drag.dy, -drag.dx, 0, drag.dlength * 5));

 } 
 
	plane.draw(multiply(rotate, VPMatrix), time);
	requestAnimationFrame(tick);
}

tick();
