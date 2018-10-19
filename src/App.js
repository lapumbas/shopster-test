import React, { Component } from 'react';

import BarChart from './components/bar-chart/BarChart';
class App extends Component {
  state = {
    data: [30, 15, 1, 10, 40, 13],
    width: 900,
    height: 500
  };
  render() {
    return (
      <div>
        <BarChart data={this.state.data} w={this.state.width} h={this.state.height} />
      </div>
    );
  }
}

export default App;
