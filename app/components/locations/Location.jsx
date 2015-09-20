import { React, NestedViewList, View, List, Drawer, Button } from 'reapp-kit';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';

import ListPrice from '../shared/ListPrice';

import styles from './styles';
import MenuItem from './MenuItem';

class Location extends React.Page {

  state = {
    activeItem: null,
    nestedViewIndex: 2
  }

  selectItem(item) {
    this.setState({
      activeItem: item
    });
  }

  componentWillMount() {
    this.locationId = this.router().getCurrentParams().id;
    this.ref = new Firebase('https://jumpp.firebaseio.com/business/'+this.locationId);
    this.bindAsObject(this.ref, 'business');
    this.bindAsArray(this.ref.child('menus'), 'items');
  }
  
  render() {

    // fuck too late now i just have to keep it
    var mediaUrl = this.state && this.state.business && this.state.business.mediaUrl;
    var coverStyle = Object.assign(styles.cover, { backgroundImage: !!mediaUrl ? `url(${mediaUrl})` : 'none' }); 

    return (
      <View {...this.props}>
        <div style={styles.info}>
          <p style={styles.blurb}>
          { this.state && this.state.business && this.state.business.description }
          </p>
          <h2 style={styles.menuTitle}>
            menu
          </h2>
          <List>
          {
            this.state &&
            this.state.items &&
            this.state.items.map(item => {
              return (
                <List.Item
                  after={<ListPrice amount={item.price} />}
                  title={item.name}
                  wrapper={<Button chromeless onTap={() => this.selectItem(item)}/>}
                  >
                  {item.description}
                </List.Item>
              );
            })
          }
          </List>
        </div>
        <div style={coverStyle} />
        <div style={styles.name}>{this.state && this.state.business && this.state.business.name}</div>

        <Drawer
          from='bottom'
          open={!!this.state.activeItem}
          >
          <MenuItem item={this.state.activeItem} close={() => this.selectItem(null)}/>
        </Drawer>
      </View>
    );
  }
};

reactMixin(Location.prototype, ReactFireMixin);

export default Location;
