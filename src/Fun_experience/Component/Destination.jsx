import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const Destination = ({ openModalDestination, colorAuthenCity }, ref) => {
    const [nameCity, setNameCity] = useState(undefined);

    useImperativeHandle(ref, () => ({
        getnameCity() {
            return nameCity;
        },
        setNameCity(name) {
            setNameCity(name);
        },
    }));
    return (
        <TouchableWithoutFeedback onPress={openModalDestination}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    padding: verticalScale(14), // Responsive padding
                    borderRadius: moderateScale(12), // Responsive border radius
                    marginTop: verticalScale(40), // Responsive margin top
                }}
            >
                <Text style={{ color: '#000' }}>Điểm đến</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: verticalScale(8), // Responsive margin top
                    }}
                >
                    {/* Khi chưa chọn điểm đến */}
                    {nameCity === undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconFeather
                                name="map-pin"
                                size={moderateScale(20)} // Responsive icon size
                                color={colorAuthenCity ? '#c0c0c0' : 'red'}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(8), // Responsive margin left
                                    color: colorAuthenCity ? '#c0c0c0' : 'red',
                                }}
                            >
                                Điểm đến bất kì
                            </Text>
                        </View>
                    )}

                    {/* Khi đã chọn điểm đến */}
                    {nameCity !== undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconFeather
                                name="map-pin"
                                size={moderateScale(20)} // Responsive icon size
                                color="#000"
                            />
                            <Text
                                style={{
                                    marginLeft: scale(8), // Responsive margin left
                                    color: '#000',
                                    fontWeight: '500',
                                }}
                            >
                                {nameCity}
                            </Text>
                        </View>
                    )}
                    <IconEntypo name="chevron-thin-right" size={moderateScale(18)} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default forwardRef(Destination);
