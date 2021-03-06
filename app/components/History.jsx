import { React, NestedViewList, View, List } from 'reapp-kit'; 
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';

import moment from 'moment';

import ListPrice from './shared/ListPrice';

var styles = {

  welcome: {
    textAlign: 'center',
    color: '#999',
    padding: '120px 0 24px',
    fontStyle: 'italic'
  },

  name: {
    fontSize: '26px',
    lineHeight: '32px',
    color: '#00FFBB'
  }

};

class History extends React.Page {

  componentWillMount() {
    this.ref = new Firebase('https://jumpp.firebaseio.com/customers/-Jz_6nMp2oX292Lka_m1');
    this.bindAsObject(this.ref, 'customer');
    this.bindAsArray(this.ref.child('orders'), 'orders');
  }

  render() {
    return (
      <View {...this.props}>
        <NestedViewList>

          <View>
            <div style={styles.welcome}>
              <div style={styles.name}>
                {this.state && this.state.customer && this.state.customer.name}
              </div>
              transaction history
            </div>
            <List>
            {
              this.state &&
              this.state.orders && 
              this.state.orders.map(order => {
                console.log(order);
                return (
                  <List.Item
                    title={order.name}
                    after={<ListPrice amount={order.cost} />}>
                    {`${moment(order.timestamp).format('MM/DD/YY h:mma')} at ${order.business}`}
                  </List.Item>
                );
              })
            }
            </List>
          </View>

          {this.childRouteHandler()}

        </NestedViewList>
      </View>
    );
  }
};

reactMixin(History.prototype, ReactFireMixin);

export default History;
