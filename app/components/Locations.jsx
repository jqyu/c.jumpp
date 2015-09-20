import { React, NestedViewList, View, List, Button } from 'reapp-kit';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';

import NumberedMap from './shared/NumberedMap';

var styles = {

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    opacity: 0.4
  },

  listings: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '50%',
    overflow: 'auto',
    padding: '24px'
  },

  listingIcon: {
    fontFamily: 'sans-serif',
    margin: 0,
    padding: 0,
    textAlign: 'center',
    width: '60px',
    height: '60px',
    lineHeight: '60px',
    fontSize: '24px'
  }
  
};

function listingNumber(n) {
  return (
    <div style={styles.listingIcon}>{n}</div>
  );
}

class Locations extends React.Page {

  state = {
    nestedViewIndex: 1,
    disableScroll: false
  }

  disableScroll(val) {
    this.setState({
      disableScroll: val
    });
  }

  componentWillMount() {
    this.ref = new Firebase('https://jumpp.firebaseio.com/business');
    this.bindAsArray(this.ref.limitToLast(50), 'businesses');
  }

  render() {
    return (
      <View {...this.props}>
        <NestedViewList
          {...this.routedViewListProps({
            onViewEntered: i => {
              this.props.disableParentViewList(i > 0);
              this.setState({ nestedViewIndex: i })
            }
          })}
          onViewEntering={i => this.setState({ nestedViewIndex: i })}
          >
      
          <View>
            <div style={styles.map}>
              <NumberedMap listings={this.state && this.state.businesses && this.state.businesses.map((business, key) => ({ key, loc: business.location}))}/>          
            </div>
            <div style={styles.listings}>
              <List>
                {
                  this.state &&
                  this.state.businesses &&
                  this.state.businesses.map((business, key) => {
                    return (
                      <List.Item
                        title={business.name}
                        after={listingNumber(key+1)}
                        wrapper={<Button chromeless onTap={() => this.router().transitionTo('location', {}, {location_id: business['.key']})}/>}>
                        {business.description || <span />}
                      </List.Item>
                    );  
                  })
                } 
              </List>
            </div>
          </View>

          {this.childRouteHandler({
            disableParentViewList: this.disableScroll                          
          })}

        </NestedViewList>
      </View>
    );
  }
};

reactMixin(Locations.prototype, ReactFireMixin);

export default Locations;
