
var canvas = document.getElementById("myCanvas"), c = canvas.getContext('2d');

var scale_index = 0

function give_scale_value(number){
    var scale_constant_pos = [1,2,5]
    var scale_constant_neg = [5,2,1]
    var zeros = Math.floor(number/3);
    if(number >= 0){
        
        return scale_constant_pos[(number)%3]* Math.pow(10, zeros) 
    }else{
        
        return scale_constant_neg[(-number-1)%3] / Math.pow(10, zeros*-1) 
    }
    
}




var NUMBER_GRID_LINES = 50
var NUMBER_BOLDED_LINES_PER_GRID_LINES = 5;

function main(){    
    

    draw_background(canvas, c, give_scale_value(scale_index));
    graph_functions(canvas, c, give_scale_value(scale_index));
    


}

main();

document.getElementById("minus").addEventListener("click", function() {
            scale_index += 1;
            c.clearRect(0, 0, canvas.width, canvas.height);
            draw_background(canvas, c, give_scale_value(scale_index));
            graph_function_after_zoom(canvas, c, give_scale_value(scale_index) );
             
}, false);

document.getElementById("plus").addEventListener("click", function() {
        
            scale_index -= 1;
            c.clearRect(0, 0, canvas.width, canvas.height);
            draw_background(canvas, c, give_scale_value(scale_index));
            graph_function_after_zoom(canvas, c, give_scale_value(scale_index) );
}, false);


 


function draw_grid(canvas, c){

    //vertical lines
    for(var i = 0; i < canvas.width; i += canvas.width/NUMBER_GRID_LINES){
        c.moveTo(i, 0);
        c.lineTo(i, canvas.height);
        c.strokeStyle = "#f0f0f0"
        c.stroke();   
        c.lineWidth = 1;
    }
    //horizontal lines
    for(var j = 0; j < canvas.height; j += canvas.height/NUMBER_GRID_LINES){
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
    for(var k = 0; k < canvas.width; k += canvas.width/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES)){
        
        c.moveTo(k, 0);
        c.lineTo(k, canvas.height);
        c.lineWidth = 1;
        c.strokeStyle = "#c0c0c0"
        c.stroke(); 
        
    }
    
    //horizontal bold lines
    for(var l = 0; l < canvas.height; l += canvas.height/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES) ){
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
    
    var number_bolded_lines = canvas.width/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES)
    for(var i = (canvas.width/number_bolded_lines)/2*-1; i < (canvas.width/(number_bolded_lines))/2+1; i += 1 ){
        tick_values.push(toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.width+canvas.width/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES); l += canvas.width/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES) ){
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
    var number_bolded_lines = canvas.height/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES)

    var tick_values = [] //values depending on the zoom level
    for(var i = (canvas.height/number_bolded_lines)/2*-1; i < (canvas.height/number_bolded_lines)/2+1; i += 1 ){
        tick_values.push(toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.height+canvas.height/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES); l += canvas.height/(NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES) ){
        
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


function drawCurve(canvas, c, function_tree, function_scope, scale, color) {
    
    var n, xMax, xMin, yMax, yMin, xPixel, yPixel, mathX, mathY, percentX, percentY;
    
    //number of points
    n = 1000
    
    
    xMax = 10,
    xMin = -10,
    yMax = 10,
    yMin = -10;

    
    
    var starting_scale_reciprocal = 0.5;
    //var starting_scale_reciprocal = NUMBER_BOLDED_LINES_PER_GRID_LINES*(NUMBER_BOLDED_LINES_PER_GRID_LINES)/NUMBER_GRID_LINES
    

    
    xMax = xMax * scale * starting_scale_reciprocal; 
    xMin = xMin * scale * starting_scale_reciprocal;
    
    yMin = yMin * scale * starting_scale_reciprocal;
    yMax = yMax * scale * starting_scale_reciprocal; 
    
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

function graph_functions(canvas, c, scale_factor){
    math = mathjs();
    scope = {x:0};
    var expr1 = '';
    var expr2 = '';
    
    
    
    var input1 = $('#function1');
    input1.val(expr1);
    
    var input2 = $('#function2');
    input2.val(expr2);
    
    input1.keyup(function (event){
        
        c.clearRect(0, 0, canvas.width, canvas.height);

        draw_background(canvas, c, scale_factor);
        
        
        expr1 = input1.val();
        expr2 = input2.val();
        try{

                tree1 = math.parse(expr1, scope) 
                tree2 = math.parse(expr2, scope) 
            }catch(e){
                console.log("INCOMPLETE FUNCTION:",e)
            }

            try{
                drawCurve(canvas, c, tree1, scope, scale_factor, "red");   
                drawCurve(canvas, c, tree2, scope, scale_factor, "green");   
            }catch(e){
                console.log(e)
        }
    });
    input2.keyup(function (event){
        
        c.clearRect(0, 0, canvas.width, canvas.height);
        draw_background(canvas, c, scale_factor);
        
        expr1 = input1.val();
        expr2 = input2.val();
        try{

                tree1 = math.parse(expr1, scope) 
                tree2 = math.parse(expr2, scope) 
            }catch(e){
                console.log("INCOMPLETE FUNCTION:",e)
            }

            try{
                drawCurve(canvas, c, tree1, scope, scale_factor, "red");   
                drawCurve(canvas, c, tree2, scope, scale_factor, "green");   
            }catch(e){
                console.log(e)
        }
    });
    
}


function graph_function_after_zoom(canvas, c, scale_factor){
    math = mathjs();
    scope = {x:0};
    var expr1 = document.getElementById('function1').value;
    var expr2 = document.getElementById('function2').value;
    

    
    var input1 = $('#function1');
    input1.val(expr1);
    
    var input2 = $('#function2');
    input2.val(expr2);
    
        
        
        
        
    expr1 = input1.val();
    expr2 = input2.val();
    try{

            tree1 = math.parse(expr1, scope) 
            tree2 = math.parse(expr2, scope) 
        }catch(e){
            console.log("INCOMPLETE FUNCTION:",e)
        }

        try{
            drawCurve(canvas, c, tree1, scope, scale_factor, "red");   
            drawCurve(canvas, c, tree2, scope, scale_factor, "green");   
        }catch(e){
            console.log(e)
    }
    
    
}

