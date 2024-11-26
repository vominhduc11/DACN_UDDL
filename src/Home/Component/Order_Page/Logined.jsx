import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const Logined = ({ navigation, setActive }) => {
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#000',
                    paddingHorizontal: 12,
                    paddingTop: 32,
                }}
            >
                Đơn hàng
            </Text>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    paddingHorizontal: 24,
                }}
            >
                <FastImage
                    style={{
                        height: 90,
                        width: 90,
                        marginBottom: 32,
                    }}
                    source={{
                        uri: 'https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-earth-travel-abroad-travel-tourism-tourism-promotion-png-image_505653.jpg',
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        color: '#000',
                        fontSize: 16,
                    }}
                >
                    Chưa có đơn hàng nào ở đây
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 12, color: '#c0c0c0' }}>
                    Hiện tại chưa có đơn hàng nào được đặt, vui lòng mua hàng và hoạt động này sẽ được lưu tại đây.
                </Text>
                <TouchableWithoutFeedback
                    onPress={() => {
                        navigation.navigate('Home_page');
                        setActive.setHome(1);
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            backgroundColor: '#ff5c19',
                            fontWeight: '600',
                            paddingVertical: 8,
                            paddingHorizontal: 14,
                            borderRadius: 8,
                            marginTop: 16,
                        }}
                    >
                        Tiếp tục
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Logined;
