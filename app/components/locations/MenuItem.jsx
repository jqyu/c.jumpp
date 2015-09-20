import { React, View, Button } from 'reapp-kit';

import styles from './styles';

class MenuItem extends React.Component {
  render() {
    var mediaUrl = this.props.item && this.props.item.mediaUrl;
    var coverStyle = Object.assign(styles.cover, { backgroundImage: mediaUrl ? `url(${mediaUrl})` : 'none' }); 
    return (
      <View>
        <div style={styles.info}>
          <p style={styles.blurb}>
            {this.props.item && this.props.item.description}
          </p>
          <Button onTap={this.props.close}>
            Cancel
          </Button>
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
