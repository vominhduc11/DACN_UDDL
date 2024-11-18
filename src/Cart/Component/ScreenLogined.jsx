import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

import { moderateScale, verticalScale } from 'react-native-size-matters';

const ScreenLogined = ({ navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: 24,
                backgroundColor: '#fff',
            }}
        >
            <FastImage
                style={{
                    height: verticalScale(90),
                    width: verticalScale(90),
                    marginBottom: moderateScale(32),
                }}
                source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpjIs9paeuwquOJEmVOXCqz7sjlwDHIhEXA&s',
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <Text
                style={{
                    textAlign: 'center',
                    fontWeight: '600',
                    color: '#000',
                    fontSize: moderateScale(16),
                }}
            >
                Giỏ hàng đang trống
            </Text>
            <Text style={{ textAlign: 'center', marginTop: moderateScale(12), color: '#dedede' }}>
                Và giờ đã trở thành ổ của mèo. Khám phá Klook để thêm vào giỏ hàng của bạn.
            </Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                <Text
                    style={{
                        color: '#fff',
                        backgroundColor: '#ff5c19',
                        fontWeight: '600',
                        paddingVertical: moderateScale(8),
                        paddingHorizontal: moderateScale(14),
                        borderRadius: 8,
                        marginTop: moderateScale(15),
                    }}
                >
                    Về trang chủ
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ScreenLogined;
