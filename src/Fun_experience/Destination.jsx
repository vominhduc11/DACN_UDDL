import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';

const Destination = ({ nameCity, setModalVisible1 }) => {
    return (
        <TouchableWithoutFeedback onPress={() => setModalVisible1(true)}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    padding: 14,
                    borderRadius: 12,
                    marginTop: 40,
                }}
            >
                <Text style={{ color: '#000' }}>Điểm đến</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                    }}
                >
                    {nameCity === undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconFeather name="map-pin" size={20} />
                            <Text style={{ marginLeft: 8 }}>Điểm đến bất kì</Text>
                        </View>
                    )}
                    {nameCity !== undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconFeather name="map-pin" size={20} color="#000" />
                            <Text
                                style={{
                                    marginLeft: 8,
                                    color: '#000',
                                    fontWeight: '500',
                                }}
                            >
                                {nameCity}
                            </Text>
                        </View>
                    )}
                    <IconEntypo name="chevron-thin-right" size={18} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Destination;
