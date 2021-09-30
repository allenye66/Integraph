var canvas = document.getElementById("myCanvas"), c = canvas.getContext('2d');



//the initial website starts with a graph of x^2
math = mathjs(),
expr = 'x^2',
scope  = {x: 0}, 
tree = math.parse(expr, scope);

draw_grid();
draw_bold();
drawCurve();

get_input();


function draw_grid(){

    //vertical lines
    for(var i = 0; i < canvas.width; i += canvas.width/50){
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.strokeStyle = "#f0f0f0"
        c.stroke();   
        c.lineWidth = 1;
    }
    //horizontal lines
    for(var j = 0; j < canvas.height; j += canvas.height/50){
        c.moveTo(0, j)
        c.lineTo(canvas.width, j);
        c.strokeStyle = "#f0f0f0"
        c.stroke();   
        c.lineWidth = 1;
    }
    c.beginPath();
}

function draw_bold(){
 //vertical bold lines
    for(var k = 0; k < canvas.width; k += canvas.width/10){
        c.moveTo(k, 0);
        c.lineTo(k, canvas.height);
        c.lineWidth = 1;
        c.strokeStyle = "#c0c0c0"
        c.stroke(); 
    }
    
    //horizontal bold lines
    for(var l = 0; l < canvas.height; l += canvas.height/10 ){
        c.moveTo(0, l)
        c.lineTo(canvas.width, l);
        c.strokeStyle = "#c0c0c0"
        c.lineWidth = 1;
        c.stroke();
 
        
    }
    c.beginPath();
}


function draw_x_axis(){
    
    c.moveTo(0, canvas.height/2)
    c.lineTo(canvas.width, canvas.height/2);
    c.strokeStyle = "black"
    c.lineWidth = 3; 
    c.stroke();
    c.beginPath();
    
    
    //add numbers
}

function draw_y_axis(){
    
    c.moveTo(canvas.width/2, 0);
    c.lineTo(canvas.width/2, canvas.height);
    c.strokeStyle = "black"
    c.lineWidth = 3; 
    c.stroke();
    
    
    c.font = "12px Arial";
    c.fillText(1, canvas.width/2 + 18, canvas.height/2 + 15);
    
    c.beginPath();
    
    
    //add numbers
    //for(var i = 0; i <= canvas.width; i += canvas.height/10){
        
        
    //}
    
    
}


function draw_background(){
    draw_grid();
    draw_bold();
    draw_x_axis();
    draw_y_axis();
}

function drawCurve() {
    
    
    var n, xMax, xMin, yMax, yMin, xPixel, yPixel, mathX, mathY, percentX, percentY;
    
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    
    
    draw_background();
    
    
    //number of points
    n = 1000
    
    xMax = 10,
    xMin = -10,
    yMax = 10,
    yMin = -10;


    c.beginPath();
    
    for(var i = 0; i < n; i ++){
        
        percentX = i /(n-1);
        //generates a percentages of the interval n
    
        
        mathX = percentX * (xMax - xMin) + xMin;
        //generates n values between xMax and xMin
        
        mathY = evaluate(mathX);
        //mathY = Math.sin(mathX);
        
        
        //gets corresponding y values of the function
        
        //console.log("math coordinates: ", mathX, ",", mathY);
        //mathX and mathY give you n function values from xMin to xMax
        
        percentY = (mathY - yMin)/ (yMax - yMin) 
        
        //flip the graph correctly
        percentY = 1 - percentY;
        
        
        xPixel = percentX * canvas.width; 
        yPixel = percentY * canvas.height;
        
        //console.log("percents to be scaled: ", percentX, ",", percentY);
        //console.log("pixel coords: ",xPixel, ",", yPixel);
        
        c.lineTo(xPixel , yPixel);

    }
    c.strokeStyle = "red"
    c.lineWidth = 3;
    c.stroke();

    
  
}
function evaluate(mathX){
    scope.x = mathX;
    return tree.eval(); 
}


function get_input(){
    var input = $('#function');
    input.val(expr);
    input.keyup(function (event){
        expr = input.val();
        tree = math.parse(expr, scope)
        drawCurve();
    });
}
    


