import { React, NestedViewList, View, Button } from 'reapp-kit';

import { DropIn } from 'braintree-react';
import braintree from 'braintree-web';

import styles from './styles';
import Checkout from './Checkout';
import Order from './Order';

class MenuItem extends React.Component {

  state = {
    order: null
  }

  order() {
    if (this.state.order) return;
    // create order
    var key = this.props.item['.key'];
    // form copy
    var items = {};
    items[key] = Object.assign({}, this.props.item);
    delete items[key]['.key'];
    this.setState({
      order: this.props.fbref.child('orders')
        .push({
          items,
          progress: 0,
          timestamp: +Date.now(),
          userID: '-Jz_6nMp2oX292Lka_m1'
        })
    });
  }

  finished() {
    this.state.order.remove();
    this.setState({
      order: null
    });
    this.props.close();
  }

  render() {

    var mediaUrl = this.props.item && this.props.item.mediaUrl;
    var coverStyle = Object.assign(styles.cover, { backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none' }); 
 
    return (
      <View>
        <div style={styles.info}>
          { this.state.order ? 
            <Order {...this.props} order={this.state.order} finished={() => this.finished()}/> :
            <Checkout {...this.props} order={() => this.order()}/> }
        </div>
        <div style={coverStyle} />
        <div style={styles.name}>
          {this.props.item && this.props.item.name}
        </div>
      </View>
    );
  }
}

export default MenuItem;
