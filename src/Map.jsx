import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const Map = () => {
    return (
        <View style={styles.container}>
            <MapView
                // provider={PROVIDER_HERE}
                style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 52.52,
                    longitude: 13.405,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ latitude: 52.52, longitude: 13.405 }} title="Berlin" description="The capital of Germany" />
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
