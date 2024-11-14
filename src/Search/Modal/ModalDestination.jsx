import { View, Text, Modal, TextInput } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

const ModalDestination = ({ setValueInput, setListProduct }, ref) => {
    const [modalVisible1, setModalVisible1] = useState(false);

    // Cung cấp hàm openModal cho component cha
    useImperativeHandle(ref, () => ({
        openModal() {
            setModalVisible1(true);
        },
    }));

    // Sử lý khi nhấp vào tên thành phố
    const handlePressCity_Name = (cityName, cityId) => {
        setModalVisible1(false);
        setValueInput(cityName);
        setListProduct(cityId);
    };
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt hay không
            visible={modalVisible1} // điều kiện để hiện modal
            hardwareAccelerated={true}
            onRequestClose={() => {
                setModalVisible1(false); // Hành động khi người dùng nhấn nút back trên Android
            }}
        >
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
                    <IconAntDesign name="close" size={22} color="#000" onPress={() => setModalVisible1(false)} />
                    <TextInput
                        placeholder="Tìm thành phồ hoặc điểm đến"
                        placeholderTextColor="#C0C0C0"
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
        </Modal>
    );
};

export default forwardRef(ModalDestination);
