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

    const x = d3
      .scaleLinear()
      .domain([0, wws.length])
      .range([0, w]);

    const graph = d3
      .select('body')
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('background-color', '#ccc');

    const yRanges = [[h / 2, 0], [h / 2, h]];

    yRanges.forEach(item => {
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(wws)])
        .range(item);
      const line = d3
        .line()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveMonotoneX);
      graph
        .append('path')
        .attr('d', line(wws))
        .attr('stroke', 'green')
        .attr('stroke-width', '2')
        .attr('fill', 'none');
    });
  }

  render() {
    return <div />;
  }
}

export default BarChart;
