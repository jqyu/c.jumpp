import { Reapp, React, NestedViewList, View, Input, Button } from 'reapp-kit';

import Logo from './shared/Logo';
import HistoryButton from './shared/HistoryButton';

var styles = {

  self: {
    fontFamily: 'serif',
    fontSize: '16px',
    lineHeight: '24px'
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
    placeholder: placeholders[Math.floor(Math.random() * 2)]
  }
  
  render() {
    return (
      <div style={styles.self}>
        <NestedViewList {...this.props.viewListProps}>
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

          {this.props.child()}
        </NestedViewList>

        <Logo onTap={() => this.router().transitionTo('home')} large={!this.props.child()} />

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
