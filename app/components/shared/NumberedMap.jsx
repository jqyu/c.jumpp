import { React } from 'reapp-kit';

import GoogleMapsLoader from 'google-maps';

var google;

var styles = {

  self: {
    width: '100%',
    minHeight: '100%',
    margin: '0'
  }
}

class NumberedMap extends React.Component {

  marks = {}

  addMarkers(objs) {
    if (!objs || !google) return;
    var lats = 0;
    var lngs = 0;
    var count = 0;
    objs.forEach(obj => {
      var key = obj.key;
      var loc = obj.loc.split(',');
      var lat = parseInt(loc[0], 10);
      var lng = parseInt(loc[1], 10);
      var pos = new google.maps.LatLng(lat, lng)
      lats += lat;
      lngs += lng;
      count += 1;
      if (!this.marks[key])
        this.marks[key] = new google.maps.Marker({
          map: this.map,
          position: pos,
          label: ''+(key+1)
        });
      else {
        this.marks[key].setPosition(pos);
      }
    });
    if (!count) return;
    var pos = new google.maps.LatLng(lats/count, lngs/count);
    this.map.panTo(pos); 
  }

  componentDidMount() {
    GoogleMapsLoader.load(g => {
      // makes google api accessible to later calls
      google = g;
      var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(-37.805723, 144.985360),
        mapTypeControl: false
      }
      this.map = new google.maps.Map(React.findDOMNode(this), mapOptions);
      this.addMarkers(this.props.listings);
    });
  }

  componentWillReceiveProps(props) {
    this.addMarkers(this.props.listings);
  }

  render() {
    return (
      <div id="map" style={styles.self}>
        <span />
      </div>
    );
  }
};

export default NumberedMap;
