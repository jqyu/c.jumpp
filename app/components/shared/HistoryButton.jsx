import { React, Tappable } from 'reapp-kit';

var styles = {
  
  self: {
    position: 'absolute',
    bottom: '15%',
    left: '0',
    right: '0',
    margin: 'auto',
    width: '76px',
    height: '76px',
    borderRadius: '50%',
    border: '1px solid #FF00C3',
    backgroundColor: '#fff',
    color: '#FF00C3',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: '60px',
    lineHeight: '76px'
  },

  label: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '-6px',
    right: '-6px',
    width: 'auto',
    height: '18px',
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '18px',
    margin: 'auto',
    backgroundColor: '#FF00C3',
    color: '#FFF',
    transform: 'skewY(-15deg)'
  }

};

class HistoryButton extends React.Component {

  render() {
    return (
      <Tappable onTap={this.props.onTap} style={styles.self}>
        $
        <div style={styles.label}>history</div>
      </Tappable>
    );
  }

};

export default HistoryButton;
