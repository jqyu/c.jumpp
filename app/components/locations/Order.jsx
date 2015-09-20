import { React, Button } from 'reapp-kit';

import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';
import moment from 'moment';

var styles = {
  
  status: {

  }
  
  date: {
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '24px 0px',
    color: '#999'
  }
}

class Order extends React.Component {

  componentWillMount() {
    this.bindAsObject(this.props.order, 'order');
  }

  render() {
    return (
      <div>
        <p>
          hey u no what fuk off && die
          <h1>{this.state.order.process}</h1>
        </p>
        <Button>
          Received
        </Button>
        <p style={styles.date}>
          ordered at {moment(this.state.order.timestamp).format('h:mm a, MMMM DD YYYY')}
        </p>
      </div>
    );
  }
}

reactMixin(Order.prototype, ReactFireMixin);

export default Order;
