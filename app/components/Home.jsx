import { Reapp, React, NestedViewList, View, Input, Button } from 'reapp-kit';

import Logo from './shared/Logo';
import HistoryButton from './shared/HistoryButton';

var styles = {

  self: {
    fontFamily: 'serif',
    fontSize: '16px',
    lineHeight: '24px'
  },

  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: '200px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))'
  },
  
  welcome: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
    marginTop: '240px'
  },

  search: {
    padding: '12px 0 11px',
    marginBottom: '12px',
    textAlign: 'center',
    fontSize: '28px',
    lineHeight: '48px',
    borderBottom: '1px solid #00FFBB'
  }

}

var placeholders = [
  'spiciest curry in town',
  'raspberry pie'
];

class Home extends React.Component {
  state = {
    placeholder: placeholders[Math.floor(Math.random() * 2)],
    disableScroll: false
  }

  disableScroll(val) {
    this.setState({
      disableScroll: val
    });
  }
  
  render() {
    return (
      <div style={styles.self}>
        <NestedViewList
          {...this.props.viewListProps}
          disableScroll={this.state.disableScroll}
          >
          <View>
            <div style={styles.welcome}>
              what are you in the mood for?
            </div>
            
            <div style={styles.search}>
              <Input refs="search" rows="2" style={styles.search} placeholder={this.state.placeholder} />
            </div>

            <Button onTap={() => this.router().transitionTo('locations')}>
              search
            </Button>

            <HistoryButton onTap={() => this.router().transitionTo('history')} />

          </View>

          {this.props.child({
            disableParentViewList: this.disableScroll 
          })}
        </NestedViewList>
        
        <div style={styles.scrim} />
        <Logo onTap={() => window.history.back()} large={!this.props.child()} />

      </div>
    );
  }
}

export default Reapp(Home);

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/
