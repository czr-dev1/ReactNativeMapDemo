import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker, MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';

import colors from '../config/colors';

function MapScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const urlTemplate = 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

  useEffect(() => {
    loadData();
  },[])

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch('http://www.globaltraqsdev.com/api/pins', {
        method: 'GET',
        headers: {
          'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1'
        }
      });
      let json = await response.json();
      console.log(json);
      setData(json);
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ?
        <ActivityIndicator /> : (
          <MapView style={styles.mapStyle}
            provider={null}
            mapType={MAP_TYPES.NONE}>
          <UrlTile
            urlTemplate={urlTemplate}
            maximumZ={19}/>
            {data.map((item, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}}
                  title={item.title}
                  icon={require('../assets/personal_128x128.png')}
                  />)
            })}
          </MapView>
        )}

        <View style={styles.navStyle}>
          <TouchableOpacity>
            <Text>Hello World</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '90%'
  },
  navStyle: {
    flexDirection: 'row',
    backgroundColor: 'dodgerblue',
    width: Dimensions.get('window').width,
    height: '10%'
  }
})

export default MapScreen;
