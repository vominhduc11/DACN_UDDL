import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { memo } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const Title = ({ name, star, notify, place, address, evaluate, booked, navigation }) => {
    // hàm chuyển đổi chuỗi tọa độ sang obj
    function parseCoordinates(address) {
        if (address) {
            const [lat, lon] = address.split(',').map(Number); // Tách chuỗi bằng dấu ',' và chuyển thành số
            return { lat, lon }; // Trả về một đối tượng với các giá trị lat và lon
        }
        return { lat: undefined, lon: undefined };
    }
    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };
    return (
        <>
            <Text
                numberOfLines={5}
                style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#000',
                }}
            >
                {name}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                    marginBottom: 12,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <IconAntDesign name="star" size={20} color="#FFCC00" />
                    <Text
                        style={{
                            color: '#FFCC00',
                            fontSize: 16,
                            fontWeight: '800',
                        }}
                    >
                        {star}
                    </Text>
                </View>
                <Text style={{ color: '#000', marginLeft: 12 }}>({formatNumber(evaluate)} Đánh giá)</Text>
                <Text style={{ marginLeft: 18, color: '#000' }}>{formatNumber(booked)} Đã đặt</Text>
            </View>
            <TouchableWithoutFeedback
                onPress={() => {
                    if (address) {
                        navigation.navigate('Map', { lat: parseCoordinates(address).lat, lon: parseCoordinates(address).lon });
                    }
                }}
            >
                <View>
                    {notify && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 6,
                            }}
                        >
                            <IconIonicons name="notifications" size={20} color="#c0c0c0" />
                            <Text
                                numberOfLines={1}
                                style={{
                                    width: 256,
                                    color: '#000',
                                    marginLeft: 5,
                                }}
                            >
                                {notify}
                            </Text>
                        </View>
                    )}
                    {place && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconIonicons name="location-sharp" size={20} color="#c0c0c0" />
                            <Text
                                numberOfLines={1}
                                style={{
                                    width: 256,
                                    color: '#000',
                                    marginLeft: 5,
                                }}
                            >
                                {place}
                            </Text>
                        </View>
                    )}
                    <Text
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 3,
                        }}
                    >
                        <IconEntypo name="chevron-thin-right" size={14} color="#000" />
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default memo(Title);
