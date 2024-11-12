import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';

const Bottom_Action_Bar = ({ price, formatNumberWithCommas, activeIndex, setModalVisible1 }) => {
    return (
        <View
            style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                elevation: 1,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>
                        {price === undefined ? 'đ _' : `đ ${formatNumberWithCommas(price)}`}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFFFCC',
                        paddingHorizontal: 5,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: '#2E8B57', fontWeight: '700' }}>Credit +28</Text>
                    <Text>
                        <IconEntypo name="chevron-right" size={22} color="#2E8B57" />
                    </Text>
                </View>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            width: 140,
                            backgroundColor: '#FFCC00',
                            alignItems: 'center',
                            paddingVertical: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: '700',
                                fontSize: 12,
                            }}
                        >
                            Thêm vào giỏ hàng
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => {
                        if (activeIndex !== -1) {
                            setModalVisible1(true);
                        }
                    }}
                >
                    <View
                        style={{
                            width: 140,
                            backgroundColor: '#FF3300',
                            alignItems: 'center',
                            paddingVertical: 12,
                            borderRadius: 12,
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontWeight: '700',
                            }}
                        >
                            Đặt ngay
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Bottom_Action_Bar;
