
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
var NUMBER_BOLDED_LINES = NUMBER_GRID_LINES/NUMBER_BOLDED_LINES_PER_GRID_LINES;

function main(){    
    c.lineWidth = 2; //line width is 1 pixel
    
    graph_functions(canvas, c, give_scale_value(scale_index));
    draw_background(canvas, c, give_scale_value(scale_index));
    

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
        c.lineWidth = 1;
    }
    //horizontal lines
    for(var j = 0; j < canvas.height; j += canvas.height/NUMBER_GRID_LINES){
        c.moveTo(0, j)
        c.lineTo(canvas.width, j);
        
        c.stroke();   
        c.lineWidth = 1;
    }

    c.beginPath();
}

function draw_bold(canvas, c){
 //vertical bold lines
    for(var k = 0; k < canvas.width; k += canvas.width/NUMBER_BOLDED_LINES){
        
        c.moveTo(k, 0);
        c.lineTo(k, canvas.height);
        c.lineWidth = 1;
        c.stroke(); 
        
    }
    
    //horizontal bold lines
    for(var l = 0; l < canvas.height; l += canvas.height/NUMBER_BOLDED_LINES ){
        c.moveTo(0, l)
        c.lineTo(canvas.width, l);
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
    
    //c.lineWidth = 3; 
    c.stroke();
    c.beginPath();
    
    
    //add numbers 8 pixels below
    //var factor = 2;
    var tick_values = [] //values depending on the zoom level
    
    //how many bold lines there are. each tick value will correspond to a bolded line
    
    var number_bolded_lines = canvas.width/(NUMBER_BOLDED_LINES)
    for(var i = (canvas.width/number_bolded_lines)/2*-1; i < (canvas.width/(number_bolded_lines))/2+1; i += 1 ){
        tick_values.push(toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.width+canvas.width/(NUMBER_BOLDED_LINES); l += canvas.width/(NUMBER_BOLDED_LINES) ){
        c.fillText(tick_values[index], l-8, canvas.height/2+12);
        index += 1
    }   
    c.beginPath();
 
}

function draw_y_axis(canvas, c, factor){
    
    c.moveTo(canvas.width/2, 0);
    c.lineTo(canvas.width/2, canvas.height);
    //c.lineWidth = 3; 
    c.stroke();
    
    
    var number_bolded_lines = canvas.height/(NUMBER_BOLDED_LINES)

    var tick_values = [] //values depending on the zoom level
    for(var i = (canvas.height/number_bolded_lines)/2*-1; i < (canvas.height/number_bolded_lines)/2+1; i += 1 ){
        tick_values.push(-1 * toFixedIfNecessary(i*factor, 3))

    }
    
    var index = 0;
    for(var l = 0; l < canvas.height+canvas.height/NUMBER_BOLDED_LINES; l += canvas.height/NUMBER_BOLDED_LINES ){
        
        //skip the y-axis zero
        if( tick_values[index] != 0){
            c.fillText(tick_values[index], canvas.width/2+4, l+3);
        }
        index += 1
    }    
    
}


function draw_background(canvas, c, scale){
    //c.strokeStyle = "#f0f0f0"
    //draw_grid(canvas, c);
    
    //c.strokeStyle = "#c0c0c0"
    //draw_bold(canvas, c);
    
    c.strokeStyle = "black"
    c.font = "12px Courier New";

    draw_x_axis(canvas, c, scale);
    draw_y_axis(canvas, c, scale);

    
}


function drawCurve(canvas, c, function_tree, function_scope, scale, color) {
    
    
    var n, xMax, xMin, yMax, yMin, xPixel, yPixel, mathX, mathY, percentX, percentY;
    
    //number of points
    n = 10000
    
    
    xMax = 10,
    xMin = -10,
    yMax = 10,
    yMin = -10;

    
    
    var starting_scale_reciprocal = 0.5;
    

    
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
    //c.lineWidth = 3;
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
                console.log("INCOMPLETE FUNCTION:", e)
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
                console.log("INCOMPLETE FUNCTION:", e)
            }

            try{
                //whichever is drawn last has a gray line
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

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}





/*
var x_max = 5
var x_min = -5
var y_max = 5
var y_min = -5

var center_x
var center_y


//need to implement when the x/y axis is not at the center
*/
function on_click(e, x, canvas, c) {
    var pos = getMousePos(canvas, e);
    
    var pos_x = pos.x
    var pos_y = pos.y
    
    var floodfill_x = toFixedIfNecessary(pos_x, 0)
    var floodfill_y = toFixedIfNecessary(pos_y, 0)
    
    

    //no going out of bounds
    if(pos_x > canvas.width){
        pos_x = canvas.width
    }
    if(pos_y > canvas.height){
        pos_y = canvas.height
    }
    if(pos_x < 0){
        pos_x = 0
    }
    if(pos_y < 0){
        pos_y = 0
    }
    
    
    pos_x = pos_x/NUMBER_BOLDED_LINES
    pos_y = pos_y/NUMBER_BOLDED_LINES
    
    
    pos_x -= NUMBER_GRID_LINES
    pos_y -= NUMBER_GRID_LINES
    
    pos_x /= NUMBER_BOLDED_LINES 
    pos_y /= -1*NUMBER_BOLDED_LINES 
    
    
    pos_x = pos_x * give_scale_value(scale_index)
    pos_y = pos_y * give_scale_value(scale_index)
    

    pos_x = toFixedIfNecessary(pos_x, 2)
    pos_y = toFixedIfNecessary(pos_y, 2)
    
    var expr1 = document.getElementById('function1').value;
    var expr2 = document.getElementById('function2').value;
    var f1_below;
    var f2_below;
    var below_x_axis;
    var function_1_top;
    var between_two_functions = false;
    
    //is the coordinate below the graph?
    f1_below = coord_below(toFixedIfNecessary(pos_x, 3), toFixedIfNecessary(pos_y, 3), expr1)
    f2_below = coord_below(toFixedIfNecessary(pos_x, 3), toFixedIfNecessary(pos_y, 3), expr2)
    
    if(f1_below && !f2_below){
        between_two_functions = true
    }else if(!f1_below && f2_below){
        between_two_functions = true
    }
    
    if(function_on_top(pos_x, expr1, expr2) == 1){
        function_1_top = true
    }else{
        function_2_top = false
    }
        
    if(pos_y > 0){
        below_x_axis = false
    }else{
        below_x_axis = true
    }
    
    //for when theres no point floodfilling and wasting time
    var should_floodfill = false;
    
    
    var integral;
    //if there are no graphs
    if(expr1.length == 0 && expr2.length == 0){
        integral = "To calculate an integral, please enter a function."
    }
    
    //only function 1
    else if(expr1.length != 0 && expr2.length == 0){
        
        
        if(contains_trig(expr1)){
            should_floodfill = true;
            
        } 

        
        
        else{
            integral = "The integral is infinite, please click a position where the area is bounded."
            should_floodfill = false;
        }
        
        
    }
    
    //only function 2
    else if(expr1.length == 0 && expr2.length != 0){
        if(contains_trig(expr2)){
            should_floodfill = true;
            
        } 
        
        else{
            integral = "The integral is infinite, please click a position where the area is bounded."
            should_floodfill = false;
            }
        }
    
    
    //two functions 
    
    else{
        
        
        
        //coord above function 1 and below function 2
        
        
        
        if(!below_x_axis && between_two_functions){
            console.log("ABOVE X AXIS")
            

            if(!function_1_top){
                console.log("F2 TOP")
               if(get_max_power(expr2) < get_max_power(expr1)){
                    should_floodfill = true
                } 
            }
            else{
                if(get_max_power(expr1) < get_max_power(expr2)){
                    should_floodfill = true
                }
            }
            
        }else if(below_x_axis && between_two_functions){
            console.log("BELOW X AXIS")
            
            if(!function_1_top){
               if(get_max_power(expr2) > get_max_power(expr1)){
                    should_floodfill = true
                } 
            }
            else{
                if(get_max_power(expr1) > get_max_power(expr2)){
                    should_floodfill = true
                }
            }
            
            
        }else{
            
            if((!f2_below && !f1_below)  && !below_x_axis){
            integral = "The integral is infinite, the coordinate is above both functions."
            }

            else if( f2_below && f1_below && below_x_axis){
                integral = "The integral is infinite, the coordinate is below both functions."
            }else{
                integral = "The integral is infinite, please click a position where the area is bounded."
            }
        
        

        }
        
        
        
    }
    
    
       
    if(should_floodfill){
        floodFill2(c, floodfill_x, floodfill_y, 0xFFC0CBFF, 0);  //hex value color + FF
    }
       
    document.getElementById('integral_answer').innerHTML = integral;
    /*
    if(f1_below){
        console.log("the point is below function 1")
    }else{
        console.log("the point is above function 1")
    }
    if(f2_below){
        console.log("the point is below function 2")
    }else{
        console.log("the point is above function 2")
    }
    */
    
    
    
    
    var str = "Your current coordinate: (" + pos_x + ", "  + pos_y + ").";
    document.getElementById('coordinate_text').innerHTML = str;

    
}

function getPixel(pixelData, x, y) {
  if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
    return -1;  // impossible color
  } else {
    return pixelData.data[y * pixelData.width + x];
  }
}
function highest(){ 
  return [].slice.call(arguments).sort(function(a,b){ 
    return b - a; 
  }); 
}

function floodFill2(ctx, x, y, fillColor, area) {
  // read the pixels in the canvas
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // make a Uint32Array view on the pixels so we can manipulate pixels
  // one 32bit value at a time instead of as 4 bytes per pixel
  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };

  // get the color we're filling
    const targetColors = [0];
  
  // check we are actually filling a different color
   if (!targetColors.includes(fillColor)  ) {
    const spansToCheck = [];
    
    function addSpan(left, right, y, direction) {
      spansToCheck.push({left, right, y, direction});
    }
    
    function checkSpan(left, right, y, direction) {
      let inSpan = false;
      let staxrt;
      let x;
      for (x = left; x < right; ++x) {
        const color = getPixel(pixelData, x, y);
        if (targetColors.includes(color)) {
            area += give_scale_value(scale_index)
          if (!inSpan) {
            inSpan = true;
            start = x;
          }
        } else {
          if (inSpan) {
            inSpan = false;
            addSpan(start, x - 1, y, direction);
          }
        }
      }
      if (inSpan) {
        inSpan = false;
        addSpan(start, x - 1, y, direction);
      }
    }
    
    addSpan(x, x, y, 0);
    
    while (spansToCheck.length > 0) {
      const {left, right, y, direction} = spansToCheck.pop();
      
      // do left until we hit something, while we do this check above and below and add
      let l = left;
      for (;;) {
        --l;
        const color = getPixel(pixelData, l, y);
        if (!targetColors.includes(color)) {
          break;
        }
      }
      ++l
      
      let r = right;
      for (;;) {
        ++r;
        const color = getPixel(pixelData, r, y);
        if (!targetColors.includes(color)) {
          break;
        }
      }

      const lineOffset = y * pixelData.width;
      pixelData.data.fill(fillColor, lineOffset + l, lineOffset + r);
      
      if (direction <= 0) {
        checkSpan(l, r, y - 1, -1);
      } else {
        checkSpan(l, left, y - 1, -1);
        checkSpan(right, r, y - 1, -1);
      }
      
      if (direction >= 0) {
        checkSpan(l, r, y + 1, +1);
      } else {
        checkSpan(l, left, y + 1, +1);
        checkSpan(right, r, y + 1, +1);
      }     
    }
    // put the data back
       
       
    //   var str = "Your integral is: ~" + area;
    //    document.getElementById('integral_answer').innerHTML = "?";
       

    ctx.putImageData(imageData, 0, 0);
  }
}


/*
async function floodFill(ctx, x, y, fillColor, area) {
    
  // read the pixels in the canvas
    
    
    
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log(getPixel())
  
  // make a Uint32Array view on the pixels so we can manipulate pixels
  // one 32bit value at a time instead of as 4 bytes per pixel
  const pixelData = {
    width: imageData.width,
    height: imageData.height,
    data: new Uint32Array(imageData.data.buffer),
  };
  
  // get the color we're filling
    
    //cant put: the uint32 of the hex value of the fill
    
    const targetColors = [0, 4293914607, 4290888129, 4277268977, 4294046193, 4290822336, 4277137391, 4290953922, 4274045120, 4274374085, 4277203184, 4274176706, 4275624152, 4275624152, 4275492595, 4274242499, 4278190080, 4291085508, 4274439878, 4271150291, 4274242546,  4270887159, 4276282098, 4275689969, 4274966257, 4275163633, 4275426801, 4293914607, 4289967091, 4277334770, 4274768843, 4291282887, 4260557554,4260360175, 4227003122, 4291677645, 4290756543, 4276349667, 4226805743, 4225358297, 4025610737, 4286019575, 4225160918, 4288190710, 4279440382, 4279900925, 4290296053, 4274834636, 4025479151, 2146562545, 2163208175, 4285916890];
    
    //for(var i = 1; i < 999; i +=1){
    //    console.log(i, getPixel(pixelData, 400, 550));
    //}
    

  // check we are actually filling a different color
    
    const bad_colors = new Set()
  if (!targetColors.includes(fillColor)  ) {
  
    const ticksPerUpdate = 50;
    let tickCount = 0;
    const pixelsToCheck = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();
      
      const currentColor = getPixel(pixelData, x, y);
      if (targetColors.includes(currentColor)) {
          area += 1
        pixelData.data[y * pixelData.width + x] = fillColor;
        
        // put the data back
        ctx.putImageData(imageData, 0, 0);
        ++tickCount;
        if (tickCount % ticksPerUpdate === 0) {
          await wait();
        }
        
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }else{
          //console.log("bad", currentColor)
          bad_colors.add( currentColor)
      }
    }    
  }
    //console.log("the bad colors:", highest(bad_colors));
    //var myArr = Array.from(bad_colors);
    //console.log(myArr.length)
    console.log(area/100)
    //return area
    
}
function wait(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

*/



window.addEventListener('click', e => on_click(e, scale_index, canvas, c), false);


function coord_below(x_pos, y_pos, f){
    
    scope = {x:x_pos};
    
    function_y = toFixedIfNecessary(math.eval(f, scope), 3)
    
    //console.log("the y position of this coordinate on the function is: ", function_y)
    
    if(y_pos > function_y){
        //console.log("this point is above the line")
        return false
    }
    //console.log("this point is below the line")
    return true
    

}
function get_max_power(s){
    if(!s.includes("x")){
        return 0
    }
    if(!s.includes("^")){
        return 1
    }
    s = s.trim()
    var power = s.indexOf("^")
    return parseInt(s.charAt(power + 1));
}


function get_f_y(x_pos, f){
    scope = {x:x_pos};
    return toFixedIfNecessary(math.eval(f, scope), 3)
}

function function_on_top(x_pos, f1, f2){
    
    if(get_f_y(x_pos, f1) > get_f_y(x_pos, f2)){
        return 1
    }
    return 2

}

function contains_trig(s){
    if(s.includes("sin") || s.includes("cos")){
        return true
    }
    return false
}

//when there is only 1 function and it is bounded by x-axis


//when there is two functions 
//have to calculate intersection points and see if 0 is within them since x-axis is automatic bound