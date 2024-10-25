import React from 'react';
import List from './components/List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["Red", "Green", "Blue", "Pink", "Gray", "Purple", "Violet", "Indigo", "Yellow"]
    };
  }

  render() {
    return (
      <div>
        <List colors={this.state.colors} />
      </div>
    );
  }
}

export default App;
