import { View, Text, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

const ModalDestination = ({ setValueInput, setListProduct }, ref) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [showKeyBoard, setShowKeyBoard] = useState(false);

    // Khởi tạo Animated.Value với giá trị bắt đầu là 0
    const height = new Animated.Value(0);

    // Cung cấp hàm openModal cho component cha
    useImperativeHandle(ref, () => ({
        openModal() {
            setVisible(true);
        },
        closeModal() {
            setVisible(false);
        },
    }));

    // Sử lý khi nhấp vào tên thành phố
    const handlePressCity_Name = (cityName, cityId) => {
        setVisible(false);
        setValueInput(cityName);
        setListProduct(cityId);
        setValue(cityName);
    };

    // Thiết lập chuyển động
    const setAnimate = () => {
        // Reset Animated Value trước khi bắt đầu animation mới
        height.setValue(0);
        Animated.timing(height, {
            toValue: Dimensions.get('window').height - 66, // Giá trị cuối cùng
            duration: 200, // Thời gian animation
            useNativeDriver: false, // Sử dụng Native driver để tăng hiệu suất
        }).start(); // Khởi động animation
    };

    useEffect(() => {
        // Hàm xử lý khi bàn phím đóng
        const handleKeyboardHide = () => {
            console.log('set animation');
            setAnimate(); // Gọi animation khi bàn phím đóng
        };

        console.log('đã vào modal');
        // Đăng ký sự kiện khi bàn phím đóng
        const keyboardHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        // Gỡ bỏ sự kiện khi component unmount
        return () => {
            console.log('Đã xóa sự kiện');
            // Xóa sự kiện khi đóng bàn phím
            keyboardHideListener.remove();
        };
    }, []);
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt hay không
            visible={visible} // điều kiện để hiện modal
            hardwareAccelerated={true}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                        }}
                    >
                        <IconAntDesign
                            name="close"
                            size={22}
                            color="#000"
                            onPress={() => {
                                setVisible(false);
                            }}
                        />
                        <TextInput
                            placeholder="Tìm thành phồ hoặc điểm đến"
                            placeholderTextColor="#C0C0C0"
                            value={value}
                            onChangeText={setValue}
                            style={{
                                borderWidth: 1,
                                borderColor: '#f9c197',
                                borderRadius: 30,
                                flex: 1,
                                marginLeft: 14,
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                                color: '#000',
                            }}
                        />
                    </View>
                    {/* {show && ( */}
                    <Animated.ScrollView
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            top: 66,
                            width: '100%',
                            backgroundColor: '#fff',
                            height: height,
                        }}
                    >
                        <View>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#c0c0c0', paddingVertical: 12 }}>
                                <TouchableOpacity activeOpacity={0.5}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6 }}>
                                        <IconFeather name="map-pin" size={26} color="#FF6600" />
                                        <View style={{ paddingHorizontal: 12 }}>
                                            <Text style={{ color: '#000', fontWeight: 700, fontSize: 16 }}>Osaka</Text>
                                            <Text style={{ color: '#000' }}>nhật bản</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingVertical: 12 }}>
                                <Text style={{ color: '#c0c0c0', paddingHorizontal: 12 }}>Có thể bạn sẽ thích</Text>
                                <View style={{ marginTop: 12 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
                                        <Image
                                            source={{
                                                uri: 'https://res.klook.com/image/upload/c_fill,w_1265,h_712/q_80/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/yf9jzfbou3qoijdqfcpm.webp',
                                            }}
                                            height={50}
                                            width={50}
                                            borderRadius={8}
                                        />
                                        <View style={{ flex: 1, marginLeft: 10 }}>
                                            <Text style={{ color: '#000', marginBottom: 4 }} numberOfLines={1}>
                                                Tour Ngày Khu Di Tích Địa Đạo Củ Chi & Đồng Bằng Sông Cửu Long từ TP. Hồ Chí Minh
                                            </Text>
                                            <Text style={{ color: '#c0c0c0', fontWeight: 700 }}>Hồ Chí Minh</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* <FlatList
                                    data={products}
                                    renderItem={useCallback(renderItem, [])}
                                    keyExtractor={(item) => item.id}
                                    initialNumToRender={1}
                                    maxToRenderPerBatch={1}
                                    windowSize={3}
                                    removeClippedSubviews={true}
                                    scrollEventThrottle={16}
                                /> */}
                            </View>
                        </View>
                    </Animated.ScrollView>
                    {/* )} */}
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 14,
                            paddingVertical: 24,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '700',
                                color: '#000',
                            }}
                        >
                            Phổ biến nhất
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Text
                                onPress={() => handlePressCity_Name('Tokyo', 11)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Tokyo
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Osaka', 13)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Osaka
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Kyoto', 12)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Kyoto
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Thâm Quyến', 19)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Thâm Quyến
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Bangkok', 23)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Bangkok
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Seoul', 7)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Seoul
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Sydney', 27)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Sydney
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Quảng Châu', 20)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Quảng Châu
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default forwardRef(ModalDestination);
