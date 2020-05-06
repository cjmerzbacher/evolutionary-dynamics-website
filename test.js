
// Setting up the margins and the graph area
var margin = { top: 20, right: 20, bottom: 50, left: 30 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Add the SVG element
var svg = d3.select('#hardyweinberg').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    // Append a group element to SVG
    .append('g')
    // Translate that element to top left margin
    .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')
    .style('margin', 'auto');

// Establish constants
var I = 200; //Number of cases of P
var N = 200;
var p = 0.5;

function choose_genotype(prob) {
    var len = Math.round(prob * 1000);
    var choices = [];
    for (i = 0; i < len; i++) {
        choices[i] = 'A';
    }
    for (i = len; i < 1000; i++) {
        choices[i] = 'a';
    }
    return [choices[Math.floor(Math.random() * 1000)], choices[Math.floor(Math.random() * 1000)]];
}

function cross(parent1, parent2) {
    offspring_1 = parent1[Math.floor(Math.random() * 2)];
    offspring_2 = parent2[Math.floor(Math.random() * 2)];
    offspring = [offspring_1, offspring_2];
    return offspring;
}

function random_mating(pop) {
    temp_pop = pop;
    for (i = 0; i < pop.length; i++) {
        offspring = cross(pop[Math.floor(Math.random() * N)], pop[Math.floor(Math.random() * N)]);
        temp_pop[i] = offspring;
    }
    pop = temp_pop;
}

experimental = [];
// Compute populations
for (m = 0; m < I; m++) {
    var pop = [];
    p = Math.random();
    for (j = 0; j < N; j++) {
        pop[j] = choose_genotype(p);
    }
    random_mating(pop);

    f_aa = 0;
    f_aA = 0;
    f_AA = 0;

    for (k = 0; k < N; k++) {
        if (pop[k][0] == 'A' && pop[k][1] == 'A') {
            f_AA = f_AA + 1;
        }
        if (pop[k][0] == 'a' && pop[k][1] == 'a') {
            f_aa = f_aa + 1;
        }
        if (pop[k][0] == 'a' && pop[k][1] == 'A') {
            f_aA = f_aA + 1;
        }
        if (pop[k][0] == 'A' && pop[k][1] == 'a') {
            f_aA = f_aA + 1;
        }
    }

    f_aa = f_aa / N;
    f_aA = f_aA / N;
    f_AA = f_AA / N;

    experimental[m] = { p: p, aa: f_aa, AA: f_AA, aA: f_aA }
}

// Set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
x.domain([0, 1]);
y.domain([0, 1]);

// Add the axes
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .style('font', 'normal 12px Noto Serif');

svg.append("g")
    .call(d3.axisLeft(y))
    .style('font', 'normal 12px Noto Serif');

// Add the data points on SVG
svg.selectAll("dot")
    .data(experimental)
    .enter().append("circle")
    .attr("r", 3)
    .attr('stroke', '#118AB2')
    .attr('fill', '#118AB2')
    .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.aa); });

svg.selectAll("dot")
    .data(experimental)
    .enter().append("circle")
    .attr("r", 3)
    .attr('stroke', '#ffd166')
    .attr('fill', '#ffd166')
    .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.AA); });

svg.selectAll("dot")
    .data(experimental)
    .enter().append("circle")
    .attr("r", 3)
    .attr('stroke', 'red')
    .attr('fill', 'red')
    .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.aA); });

// update the elements
function update(value) {
    var I = value * 10;
    experimental = [];
    // Compute populations
    for (m = 0; m < I; m++) {
        var pop = [];
        p = Math.random();
        for (j = 0; j < N; j++) {
            pop[j] = choose_genotype(p);
        }
        random_mating(pop);

        f_aa = 0;
        f_aA = 0;
        f_AA = 0;

        for (k = 0; k < N; k++) {
            if (pop[k][0] == 'A' && pop[k][1] == 'A') {
                f_AA = f_AA + 1;
            }
            if (pop[k][0] == 'a' && pop[k][1] == 'a') {
                f_aa = f_aa + 1;
            }
            if (pop[k][0] == 'a' && pop[k][1] == 'A') {
                f_aA = f_aA + 1;
            }
            if (pop[k][0] == 'A' && pop[k][1] == 'a') {
                f_aA = f_aA + 1;
            }
        }

        f_aa = f_aa / N;
        f_aA = f_aA / N;
        f_AA = f_AA / N;

        experimental[m] = { p: p, aa: f_aa, AA: f_AA, aA: f_aA }
    }

    svg.selectAll("dot1")
        .data(experimental)
        .attr("r", 3)
        .attr('stroke', 'red')
        .attr('fill', 'red')
        .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.aA); });

    svg.selectAll("circle")
        .data(experimental)
        .attr("r", 3)
        .attr('stroke', '#118AB2')
        .attr('fill', '#118AB2')
        .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.aa); });

    svg.selectAll("circle")
        .data(experimental)
        .attr("r", 3)
        .attr('stroke', '#ffd166')
        .attr('fill', '#ffd166')
        .attr("cx", function (d) { return x(d.p); }).attr("cy", function (d) { return y(d.AA); });

}

// when the input range changes update the circle
d3.select("#slider").on("input", function () {
    update(+this.value);
});