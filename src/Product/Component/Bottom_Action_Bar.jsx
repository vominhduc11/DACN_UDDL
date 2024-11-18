import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import { moderateScale, scale } from 'react-native-size-matters';

const Bottom_Action_Bar = ({ price, formatNumberWithCommas, activeIndex, setModalVisible1, setModalVisible2 }, ref) => {
    // Nút cart trên cùng góc phải
    const btnAddCartRef = useRef();
    const bottom = useRef(new Animated.Value(0)).current;

    useImperativeHandle(ref, () => ({
        async getCoordinates() {
            const coordinates = await new Promise((resolve) => {
                btnAddCartRef.current.measure((fx, fy, width, height, px, py) => {
                    resolve({ x: px, y: py });
                });
            });

            return { x: coordinates.x, y: coordinates.y };
        },
    }));
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
                <TouchableWithoutFeedback
                    onPress={() => {
                        if (activeIndex !== -1) {
                            setModalVisible2(true);
                        }
                    }}
                >
                    <View
                        style={{
                            width: scale(150),
                            backgroundColor: '#FFCC00',
                            alignItems: 'center',
                            paddingVertical: 12,
                            borderRadius: 12,
                        }}
                    >
                        {/* Phần tử chuyển động giỏ hàng */}
                        <Animated.View
                            style={{
                                width: scale(40),
                                height: scale(40),
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: bottom,
                                left: moderateScale(50),
                            }}
                        >
                            <IconFeather name="shopping-cart" size={20} color="#000" />
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'red',
                                    width: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    top: -2,
                                    left: 24,
                                }}
                            >
                                <Text style={{ fontSize: 10, fontWeight: '700' }}>1</Text>
                            </View>
                        </Animated.View>

                        <Text
                            ref={btnAddCartRef}
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

export default memo(forwardRef(Bottom_Action_Bar));
