// Establish constants
var N = 20; //Number of individuals
var num_red = N / 2;
var pop = [];
var color_choices = ["#118AB2", "#ffd166"];
var generations = 100;

// Create randomly distributed data points
for (i = 0; i < N; i++) {
    x = Math.random();
    y = Math.random();
    color = Math.floor(Math.random() * 2);
    if (color == 0) {
        color = color_choices[0];
    }
    else { color = color_choices[1]; }
    pop[i] = { x: x, y: y, color: color }
}

// Setting up the margins and the graph area
var margin = { top: 20, right: 20, bottom: 50, left: 20 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Add the SVG element
var svg = d3.select('#moran').append('svg')
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

// Update dataset with each generation
function generation() {
    var i = Math.floor(Math.random() * N);
    var ind = pop[i];
    color = Math.floor(Math.random() * 2);
    ind.x = Math.random();
    ind.y = Math.random();
    if (color == 0) {
        ind.color = color_choices[0];
    }
    else { ind.color = color_choices[1]; }
    pop[i] = ind;
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