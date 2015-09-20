import { React, Button } from 'reapp-kit';

import { DropIn } from 'braintree-react';
import braintree from 'braintree-web';

import styles from './styles';

class Checkout extends React.Component {

  render() {
   return (
      <div>  
        <p style={styles.blurb}>
          {this.props.item && this.props.item.description}
        </p>
        <h3 style={styles.bigPrice}>
          {'$' + (this.props.item && this.props.item.price.toFixed(2))}
        </h3>
        <form id="checkout">
          <DropIn braintree={braintree} />
          <Button onTap={() => this.props.order()}>
            Purchase
          </Button>
        </form>
        <Button onTap={this.props.close}>
          Cancel
        </Button>
      </div>
    );
  }
}

export default Checkout;
