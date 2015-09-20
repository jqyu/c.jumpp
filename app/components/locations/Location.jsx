import { React, NestedViewList, View, List } from 'reapp-kit';

import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';

import reactMixin from 'react-mixin';

var styles = {

  cover: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
    height: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: '#FF00C3',
    opacity: '0.2'
  },

  name: {
    position: 'absolute',
    left: '24px',
    right: '24px',
    top: '176px',
    height: '48px',
    lineHeight: '48px',
    fontSize: '20px',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    color: '#fff',
    backgroundColor: '#00FFBB'
  },

  info: {
    position: 'absolute',
    top: '200px',
    left: '24px',
    right: '24px',
    bottom: 0,
    overflow: 'auto'
  },

  blurb: {
    padding: '24px 0px',
    margin: '48px 0 0',
    textAlign: 'center',
    fontStyle: 'italic'
  },

  menuTitle: {
    margin: '24px 0px',
    textTransform: 'uppercase',
    letterSpacing: '0.4em',
    fontSize: '10px',
    color: '#999',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderWidth: '1px 0px'
  }

};

class Location extends React.Page {

  state = {
    nestedViewIndex: 2,
    disableScroll: false
  }

  disableScroll(val) {
    this.setState({
      disableScroll: val
    });
  }

  componentWillMount() {
    this.locationId = this.router().getCurrentQuery().location_id;
    this.ref = new Firebase('https://jumpp.firebaseio.com/business/'+this.locationId);
    this.bindAsObject(this.ref, 'location');
    this.bindAsArray(this.ref.child('menus'), 'items');
  }
  
  render() {

    // fuck too late now i just have to keep it
    var mediaUrl = this.state && this.state.location && this.state.location.mediaUrl;
    var coverStyle = Object.assign(styles.cover, { backgroundImage: !!mediaUrl ? `url(${mediaUrl})` : 'none' }); 

    return (
      <View {...this.props}>
        <NestedViewList
          onViewEntering={i => this.setState({ nestedViewIndex: i })}
          >
          <View>
            <div style={styles.info}>
              <p style={styles.blurb}>
              { this.state && this.state.location && this.state.location.description }
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
                    <List.Item>
                      Cost: {console.log(item)}
                    </List.Item>
                  );
                })
              }
              </List>
            </div>
            <div style={coverStyle} />
            <div style={styles.name}>{this.state && this.state.location && this.state.location.name}</div>
          </View>

          {this.childRouteHandler()}

        </NestedViewList>
      </View>
    );
  }
};

reactMixin(Location.prototype, ReactFireMixin);

export default Location;
