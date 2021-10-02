


function main(){
    var canvas = document.getElementById("myCanvas"), c = canvas.getContext('2d');

    math = mathjs(),
    expr = 'x^2',
    scope  = {x: 0}, 
    tree = math.parse(expr, scope);


    var scale_values = [0.005,0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200]
    var scale_index = Math.floor(scale_values.length/2);


    drawCurve(canvas, c, tree, scope, scale_values[scale_index], "red");

    get_input();


    document.getElementById("minus").addEventListener("click", function() {
            scale_index += 1;
            drawCurve(canvas, c, tree, scope, scale_values[scale_index], "blue");

    }, false);


    document.getElementById("plus").addEventListener("click", function() {
            scale_index -= 1;
            drawCurve(canvas, c, tree, scope, scale_values[scale_index], "red");
 
    }, false);

}

main()

function draw_grid(canvas, c){

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

function draw_bold(canvas, c){
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

function toFixedIfNecessary( value, dp ){
  return +parseFloat(value).toFixed( dp );
}

function draw_x_axis(canvas, c, factor){
    
    c.moveTo(0, canvas.height/2)
    c.lineTo(canvas.width, canvas.height/2);
    c.strokeStyle = "black"
    c.lineWidth = 3; 
    c.stroke();
    c.beginPath();
    
    
    //add numbers 8 pixels below
    c.font = "12px Arial";
    //var factor = 2;
    var tick_values = [] //values depending on the zoom level
    
    //how many bold lines there are. each tick value will correspond to a bolded line
    for(var i = (canvas.width/(canvas.width/10))/2*-1; i < (canvas.width/(canvas.width/10))/2+1; i += 1 ){
        tick_values.push(toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.width+canvas.width/10; l += canvas.width/10 ){
        c.fillText(tick_values[index], l-8, canvas.height/2+12);
        index += 1
    }
    
    
    c.beginPath();
    
    
}

function draw_y_axis(canvas, c, factor){
    
    c.moveTo(canvas.width/2, 0);
    c.lineTo(canvas.width/2, canvas.height);
    c.strokeStyle = "black"
    c.lineWidth = 3; 
    c.stroke();
    
    
    c.font = "12px Arial";
    var tick_values = [] //values depending on the zoom level
    for(var i = (canvas.height/(canvas.height/10))/2*-1; i < (canvas.height/(canvas.height/10))/2+1; i += 1 ){
        tick_values.push(toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.height+canvas.height/10; l += canvas.height/10 ){
        
        //skip the y-axis zero
        if( tick_values[index] != 0){
            c.fillText(tick_values[index], canvas.width/2+4, l+3);
        }
        index += 1
    }    
    
}


function draw_background(canvas, c, scale){
    draw_grid(canvas, c);
    draw_bold(canvas, c);
    draw_x_axis(canvas, c, scale);
    draw_y_axis(canvas, c, scale);

}


// ADJUST THE WINDOW TO THE SCALE
function drawCurve(canvas, c, function_tree, function_scope, scale, color) {
    
    var n, xMax, xMin, yMax, yMin, xPixel, yPixel, mathX, mathY, percentX, percentY;
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    draw_background(canvas, c, scale);
    
    //number of points
    n = 1000
    
    xMax = 10,
    xMin = -10,
    yMax = 10,
    yMin = -10;
    
    
    var starting_scale_reciprocal = 0.5;
    xMax = xMax * scale*starting_scale_reciprocal; 
    xMin = xMin * scale*starting_scale_reciprocal;
    
    yMin = yMin * scale*starting_scale_reciprocal;
    yMax = yMax * scale*starting_scale_reciprocal;
    
    
    c.beginPath();
    
    for(var i = 0; i < n; i ++){
        
        percentX = i /(n-1);
        //generates a percentages of the interval n
    
        
        mathX = percentX * (xMax - xMin) + xMin;
        //generates n values between xMax and xMin
        
        mathY = evaluate(function_tree, function_scope, mathX);
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
    c.strokeStyle = color
    c.lineWidth = 3;
    c.stroke();
  
}
function evaluate(tree, s, mathX){
    s.x = mathX;
    return tree.eval(); 
}


function get_input(){
    var input = $('#function1');
    input.val(expr);
    input.keyup(function (event){
        expr = input.val();
        tree1 = math.parse(expr, scope)
        drawCurve(scope, 2, "red");
    });
    

    
}

