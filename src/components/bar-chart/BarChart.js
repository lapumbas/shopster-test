import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import styled from 'styled-components';
import * as d3 from 'd3';

const StyledSVG = styled.svg`
  background-color: #ccc;
  padding: 10px;
`;

class BarChart extends React.PureComponent {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const faux = this.props.connectFauxDOM('g', 'chart');
    const { data, w, h } = this.props;
    const iterations = 10;

    const maxOfData = Math.max(...data);

    const y = (domain, range) => {
      return d3
        .scaleLinear()
        .domain(domain)
        .range(range);
    };

    const expandedData = data
      .map((item, i, arr) => {
        if (!arr[i + 1]) return;
        const k = (h * (item - arr[i + 1])) / (4 * maxOfData);
        const realDot = y([0, maxOfData], [0, h / 2])(item);
        const addDots = [realDot];
        for (let index = 1; index < iterations; index++) {
          addDots.push(
            Math.cos((index * Math.PI) / iterations) * k + k + (arr[i + 1] * h) / (2 * maxOfData)
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
      .domain([0, expandedData.length])
      .range([0, w]);

    const graph = d3.select(faux);

    const yRanges = [[h / 2, 0], [h / 2, h]];

    yRanges.forEach(item => {
      const line = d3
        .line()
        .x((d, i) => x(i))
        .y(d => y([0, d3.max(expandedData)], item)(d))
        .curve(d3.curveMonotoneX);

      graph
        .append('path')
        .attr('d', line(expandedData))
        .attr('stroke', 'green')
        .attr('stroke-width', '2')
        .attr('fill', 'none');
    });
  }

  render() {
    const { w, h } = this.props;
    return (
      <StyledSVG width={w} height={h}>
        {this.props.chart}
      </StyledSVG>
    );
  }
}

export default withFauxDOM(BarChart);
