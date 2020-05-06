// Getting the data
var data = [{ time: 0, pop: 4.6 },
    { time: 15, pop: 6 },
    { time: 30, pop: 7.6 },
    { time: 45, pop: 10.8 },
    { time: 60, pop: 15.1 },
    { time: 75, pop: 21.5 },
    { time: 90, pop: 27.9 }
    ];
    
    // Setting up the margins and the graph area
    var margin = { top: 20, right: 20, bottom: 50, left: 70 },
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
    
    
    // Add the SVG element
    var svg = d3.select('#exponential').append('svg')
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
    x.domain([0, d3.max(data, function (d) { return d.time; })]);
    y.domain([0, d3.max(data, function (d) { return d.pop; })]);
    
    // Define the line
    var valueline = d3.line()
        .x(function (d) { return x(d.time); })
        .y(function (d) { return y(d.pop); })
        .curve(d3.curveBasis);
    
    
    // Add the axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .style('font', 'normal 12px Noto Serif');
    
    svg.append("g")
        .call(d3.axisLeft(y))
        .style('font', 'normal 12px Noto Serif');
    
    // X axis label
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .style('font', 'normal 12px Varela Round')
        .text("Time (minutes)");
    
    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "3em")
        .style("text-anchor", "middle")
        .text("Population of Bacteria (millions)")
        .style('font', 'normal 12px Varela Round');
    
    // Draw the line on SVG
    svg.append('path')
        .data([data])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("fill", "none")
        .attr("stroke", "#118AB2")
        .attr("stroke-width", 3);
    
    // Add the data points on SVG
    svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr('stroke', '#118AB2')
    .attr('fill', '#118AB2')
    .attr("cx", function(d) { return x(d.time); }) .attr("cy", function(d) { return y(d.pop); });
    
    