import { View, Text, TouchableWithoutFeedback, ScrollView, Modal } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const Logged = () => {
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
                Yêu thích
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
                    Chưa có hoạt động nào ở đây
                </Text>
                <Text style={{ textAlign: 'center', marginTop: 12, color: '#c0c0c0' }}>
                    Có hoạt động bạn muốn lưu để xem sau? Hãy nhấn vào biểu tượng trái tim và hoạt động này sẽ được lưu tại đây.
                </Text>
                <TouchableWithoutFeedback>
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
                        Khám phá
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Logged;
