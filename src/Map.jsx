import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const Map = ({ route }) => {
    const { lat, lon } = route.params;
    console.log(lat, lon);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ latitude: lat, longitude: lon }} title="Berlin" description="The capital of Germany" />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;
