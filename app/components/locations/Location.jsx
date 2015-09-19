import { React, NestedViewList, View } from 'reapp-kit';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';

var styles = {

};

class Location extends React.Component {

  componentWillMount() {
  }
  
  render() {
    return (
      <View {...this.props}>
        hey this is a test
      </View>
    );
  }
};

export default Location;
