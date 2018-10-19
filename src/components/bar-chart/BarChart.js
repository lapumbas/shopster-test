import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const { data, w, h } = this.props;

    const maxOfData = Math.max(...data);
    const wws = data
      .map((item, i, arr) => {
        if (!arr[i + 1]) return;
        const k = (h * (item - arr[i + 1])) / (4 * maxOfData);
        const addDots = [(item * h) / (2 * maxOfData)];
        for (let index = 1; index < 20; index++) {
          addDots.push(
            Math.cos((index * Math.PI) / 20) * k + k + (arr[i + 1] * h) / (2 * maxOfData)
          );
        }
        return addDots;
      })
      .filter(item => item)
      .reduce((acc, item) => {
        return [...acc, ...item];
      }, []);

    // console.log(wws);

    const x = d3
      .scaleLinear()
      .domain([0, wws.length])
      .range([0, w]);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(wws)])
      .range([h / 2, 0]);

    const y2 = d3
      .scaleLinear()
      .domain([0, d3.max(wws)])
      .range([h / 2, h]);

    const line1 = d3
      .line()
      .x((d, i) => x(i))
      .y(d => y1(d))
      .curve(d3.curveMonotoneX);

    const line2 = d3
      .line()
      .x((d, i) => x(i))
      .y(d => y2(d))
      .curve(d3.curveMonotoneX);

    const graph = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#ccc');

    graph
      .append('path')
      .attr('d', line1(wws))
      .attr('stroke', 'green')
      .attr('stroke-width', '2')
      .attr('fill', 'none');

    graph
      .append('path')
      .attr('d', line2(wws))
      .attr('stroke', 'green')
      .attr('stroke-width', '2')
      .attr('fill', 'none');
  }

  render() {
    return <div />;
  }
}

export default BarChart;
