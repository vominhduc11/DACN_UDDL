import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import FastImage from 'react-native-fast-image';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const ScreenNotLogin = ({ navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                paddingHorizontal: moderateScale(24),
                backgroundColor: '#fff',
            }}
        >
            <FastImage
                style={{
                    height: verticalScale(90),
                    width: verticalScale(90),
                    marginBottom: verticalScale(32),
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
                Giỏ hàng
            </Text>
            <Text
                style={{
                    textAlign: 'center',
                    marginTop: verticalScale(12),
                    color: '#dedede',
                }}
            >
                Đăng nhập để thêm dịch vụ vào giỏ hàng
            </Text>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                <Text
                    style={{
                        color: '#fff',
                        backgroundColor: '#ff5c19',
                        fontWeight: '600',
                        paddingVertical: verticalScale(8),
                        paddingHorizontal: moderateScale(14),
                        borderRadius: scale(8),
                        marginTop: verticalScale(16),
                    }}
                >
                    Đăng nhập
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ScreenNotLogin;
