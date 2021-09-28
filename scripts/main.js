var canvas = document.getElementById("myCanvas"), c = canvas.getContext('2d');


math = mathjs(),
expr = 'sin(x)',
scope  = {x: 0}, 
tree = math.parse(expr, scope);
drawCurve();
get_input();

function drawCurve() {
    
    
    var n, xMax, xMin, yMax, yMin, xPixel, yPixel, mathX, mathY, percentX, percentY;
    
    
    c.clearRect(0, 0, canvas.width, canvas.height);
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
    


