import React from 'react';
import Clock from './Clock';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const timer = setInterval(() => {
      this.setState((prev) => ({ count: prev.count + 1 }));

      if (this.state.count === this.props.duration) {
        clearInterval(timer);
      }
    }, 1000);
  }

  render() {
    return <Clock duration={this.props.duration} count={this.state.count} />;
  }
}

export default Timer;
