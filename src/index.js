import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
console.log(1234);

const LoadableComponent = Loadable({
  loader: () => import('./test'),
  loading(props) {
    if (props.error) {
      return (<div>
        error...
      </div>);
    } else {
      return (<div>
        Loading...
      </div>);
    }
  },
});

class App extends React.Component {
  render() {
    return (
      <div>
        <LoadableComponent/>
        <div>
          {
            this.props.data
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.string,
};

ReactDOM.render(<App data="123"/>, document.getElementById('root'));
