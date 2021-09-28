var canvas = document.getElementById("myCanvas"), c = canvas.getContext('2d');


drawCurve();

function drawCurve() {
    
    var n, xMax, xMin, yMax, yMin, percent, xPixel, yPixel, mathX, mathY, percentY;
    
    //number of points
    n = 100
    
    xMax = 10,
    xMin = -10,
    yMax = 10,
    yMin = -10;

    
    c.beginPath();
    
    for(var i = 0; i < n; i ++){
        percent = i /(n-1)
        
        mathX = percent * (xMax - xMin) + xMin;
        mathY = Math.sin(mathX);
        
        percentY = (mathY - yMin)/ (yMax - yMin) 
        
        xPixel = percent * canvas.width;
        yPixel = percentY * canvas.height;
        
        c.lineTo(xPixel , yPixel);

    }
    /*
    for(var i = 0; i < n; i ++){

        percent = i /(n-1);
        
        x = percent * canvas.height;
        y = percent * canvas.width;
        c.lineTo(x, y);

    }*/
}

c.stroke();

