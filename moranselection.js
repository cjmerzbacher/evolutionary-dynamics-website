// Establish constants
var prop_red = 0.5 // Proportion of red in population to start
var N = 20; //Number of individuals
var num_red = prop_red*N;
var pop_red = [];
var pop_blue = [];
var color_choices = ["#118AB2", "#ffd166"];
var generations = 100;
var r = 0.1; // make slider

// Initialize red and blue populations
for (i = 0; i < num_red; i++) {
    x = Math.random();
    y = Math.random();
    color = color_choices[0];
    pop_red[i] = { x: x, y: y, color: color }
}

for (i = 0; i < N-num_red; i++) {
    x = Math.random();
    y = Math.random();
    color = color_choices[1];
    pop_blue[i] = { x: x, y: y, color: color }
}

pop = pop_red.concat(pop_blue);

// Setting up the margins and the graph area
var margin = { top: 20, right: 20, bottom: 50, left: 20 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Add the SVG element
var svg = d3.select('#moranselection').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // Append a group element to SVG
    .append('g')
    // Translate that element to top left margin
    .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')
    .style('margin', 'auto');

// Set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
x.domain([-0.1, 1.1]);
y.domain([-0.1, 1.1]);

// Create rectangle delimiting animation area
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("stroke", "#118AB2")
    .attr("fill", "none")
    .attr("stroke-width", 3);

// Plot points in rectangle as circles
svg.selectAll("dot")
    .data(pop)
    .enter().append("circle")
    .attr("r", 10)
    .attr('stroke', function (d) { return d.color; })
    .attr("fill", function (d) { return d.color; })
    .attr("cx", function (d) { return x(d.x); })
    .attr("cy", function (d) { return y(d.y); });


function choose(prob) {
    var len = prob*1000;
    var choices = [];
    for (i = 0; i < len; i++) {
        choices[i] = 0;
    }
    for (i = len; i < 1000; i++) {
        choices[i] = 1;
    }
    var i = Math.floor(Math.random() * 1000);
    return choices[i];
}

// Update dataset with each generation
function generation() {
    var x = Math.random();
    var y = Math.random();

    var prob_reproduction = [(r*num_red)/(r*num_red+N-num_red),(N-num_red)/(r*num_red+N-num_red)];
    var prob_elimination = [num_red/N, (N-num_red)/N];
    var elim = choose(prob_elimination[0]);
    var repr = choose(prob_reproduction[0]);
    console.log(elim, repr);

    if (elim == 0 && pop_red.length != 0){
        num_red = num_red - 1;
        pop_red.shift();
        console.log('red deleted')
    }
    if (elim == 1 && pop_blue.length != 0){
        pop_blue.shift()
        console.log('blue deleted')
    }
    if (repr == 0){
        pop_red.push({ x: x, y: y, color: color_choices[0] });
        num_red = num_red + 1;
        console.log('red reproduced')
    }
    else{
        pop_blue.push({ x: x, y: y, color: color_choices[1] });
        console.log('blue reproduced')
    }

    pop = pop_red.concat(pop_blue);
    console.log(pop_red.length, pop_blue.length);
}


        
for (i = 0; i < generations; i++) {
    time = 400*(i+1);
    setTimeout(function(){
        generation();
        svg.selectAll("circle")
        .data(pop)
        .attr("r", 10)
        .attr('stroke', function (d) { return d.color; })
        .attr("fill", function (d) { return d.color; })
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); });
    }, time);
}
