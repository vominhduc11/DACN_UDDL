import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const Bottom_Action_Bar = (
    {
        price,
        formatNumberWithCommas,
        activeIndex,
        setModalVisible1,
        setModalVisible2,
        getCoordinatesBtnAddCart,
        getCoordinatesBtnCart,
        setUnviewedCartCount_Header,
    },
    ref
) => {
    const [showCartAnimate, setShowCartAnimate] = useState(false);
    const [unviewedCartCount, setUnviewedCartCount] = useState(0);
    // Nút cart trên cùng góc phải
    const btnAddCartRef = useRef();
    const bottom = useRef(new Animated.Value(0)).current;
    const left = useRef(new Animated.Value(50)).current;

    useImperativeHandle(ref, () => ({
        async getCoordinates() {
            const coordinates = await new Promise((resolve) => {
                btnAddCartRef.current.measure((fx, fy, width, height, px, py) => {
                    resolve({ x: px, y: py });
                });
            });

            return { x: coordinates.x, y: coordinates.y };
        },

        showCartAnimate() {
            setShowCartAnimate(true);
        },

        setUnviewedCartCount(value) {
            setUnviewedCartCount(value);
        },
    }));

    // Set chuyển động giỏ hàng
    useEffect(() => {
        async function setAnimateForCart() {
            const a = await getCoordinatesBtnAddCart();
            const b = await getCoordinatesBtnCart();
            const result1 = a.y - b.y;
            const result2 = b.x - a.x;
            console.log(result2);

            Animated.parallel([
                Animated.timing(bottom, {
                    toValue: result1, // Di chuyển lên 200px
                    duration: 400,
                    useNativeDriver: false,
                }),
                Animated.timing(left, {
                    toValue: result2, // Hiển thị hoàn toàn
                    duration: 400,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                // Bỏ giao diện animate , set về vị trí cũ , thay đổi giá trị sản phẩn giỏ hàng chưa xem trong component Header
                setShowCartAnimate(false);
                setUnviewedCartCount_Header(unviewedCartCount);
                bottom.setValue(0);
                left.setValue(50);
            });
        }
        // Thực hiện animate khi set showCartAnimate = true
        if (showCartAnimate) {
            setAnimateForCart();
        }
    }, [showCartAnimate]);

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
                        {showCartAnimate && (
                            <Animated.View
                                style={{
                                    width: scale(40),
                                    height: scale(40),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    zIndex: 2,
                                    bottom: bottom,
                                    left: left,
                                    // backgroundColor: 'red',
                                }}
                            >
                                <IconFeather name="shopping-cart" size={20} color="#000" />
                                {unviewedCartCount === 0 || (
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
                                        <Text style={{ fontSize: 10, fontWeight: '700' }}>{unviewedCartCount}</Text>
                                    </View>
                                )}
                            </Animated.View>
                        )}
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
