import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    var data = [3, 2, 1];

    const m = [80, 80, 80, 80]; // margins
    const w = 1000 - m[1] - m[3]; // width
    const h = 400 - m[0] - m[2]; // height

    // X scale will fit all values from data[] within pixels 0-w
    const x = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, w]);
    // Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([h, 0]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y(d => y(d))
      .curve(d3.curveMonotoneX);

    const graph = d3
      .select('body')
      .append('svg')
      .attr('width', w + m[1] + m[3])
      .attr('height', h + m[0] + m[2])
      .append('g')
      .attr('transform', 'translate(' + m[3] + ',' + m[0] + ')')
      .style('background-color', '#ccc')

    // 			// create yAxis
    // var xAxis = d3.svg.axis().scaleLinear(x).tickSize(-h).tickSubdivide(true);
    // // Add the x-axis.
    // graph.append("svg:g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(0," + h + ")")
    //       .call(xAxis);

    // // create left yAxis
    // var yAxisLeft = d3.svg.axis().scaleLinear(y).ticks(4).orient("left");
    // // Add the y-axis to the left
    // graph.append("svg:g")
    //       .attr("class", "y axis")
    //       .attr("transform", "translate(-25,0)")
    //       .call(yAxisLeft);

    graph
      .append('path')
      .attr('d', line(data))
      .attr('stroke', 'red')
      .attr('fill', 'none');
  }

  render() {
    return <div />;
  }
}

export default BarChart;
