import { Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import { scale } from 'react-native-size-matters';

const Header = ({ opacity, backgroundBtn, colorBtn, navigation }, ref) => {
    // Nút cart trên cùng góc phải
    const btnCartRef = useRef();

    useImperativeHandle(ref, () => ({
        async getCoordinates() {
            const coordinates = await new Promise((resolve) => {
                btnCartRef.current.measure((fx, fy, width, height, px, py) => {
                    resolve({ x: px, y: py });
                });
            });

            return { x: coordinates.x, y: coordinates.y };
        },
    }));
    return (
        <View
            style={{
                padding: 12,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            }}
        >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View
                    style={{
                        backgroundColor: backgroundBtn,
                        padding: 10,
                        borderRadius: 30,
                    }}
                >
                    <IconEntypo name="chevron-left" size={20} color={colorBtn} />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                            marginRight: 12,
                        }}
                    >
                        <IconMaterialIcons name="favorite-border" size={20} color={colorBtn} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View
                        ref={btnCartRef}
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                        }}
                    >
                        <IconFeather name="shopping-cart" size={20} color={colorBtn} />
                        {/* Số lượng sản phẩm chưa xem trong giỏ hàng */}

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
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default forwardRef(Header);
