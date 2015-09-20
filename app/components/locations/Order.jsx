import { React, Button } from 'reapp-kit';

import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';
import moment from 'moment';

var messages = [
  'pending',
  'in process',
  'ready'
];

var styles = {
  
  status: {
    margin: '72px 0 24px',
    textAlign: 'center',
    color: '#999',
    fontSize: '14px',
    letterSpacing: '0.3em'
  },

  message: {
    fontSize: '30px',
    lineHeight: '60px',
    letterSpacing: '0em',
    color: '#000',
    fontStyle: 'italic'

  },
  
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
        <div style={styles.status}>
          ORDER STATUS
          <div style={styles.message}>
            {messages[this.state.order.progress]}
          </div>
        </div>
        { (this.state.order.progress > 1) && 
        <Button onTap={this.props.finished}>
          Finished
        </Button>
        }
        <p style={styles.date}>
          ordered at {moment(this.state.order.timestamp).format('h:mm a, MMMM DD YYYY')}
        </p>
      </div>
    );
  }
}

reactMixin(Order.prototype, ReactFireMixin);

export default Order;
