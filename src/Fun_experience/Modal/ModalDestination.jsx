import { View, Text, Modal, TextInput } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

const ModalDestination = ({ modalVisible1, setModalVisible1, setNameCity }) => {
    const handlePressCity = (param) => {
        setNameCity(param);
        setModalVisible1(false);
    };
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt hay không
            visible={modalVisible1} // điều kiện để hiện modal
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
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                    }}
                >
                    <IconAntDesign name="close" size={22} onPress={() => setModalVisible1(false)} />
                    <TextInput
                        placeholder="Tìm thành phồ hoặc điểm đến"
                        style={{
                            borderWidth: 1,
                            borderColor: '#f9c197',
                            borderRadius: 30,
                            flex: 1,
                            marginLeft: 14,
                            paddingHorizontal: 12,
                            paddingVertical: 6,
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
                            onPress={() => handlePressCity('Tokyo')}
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
                            onPress={() => handlePressCity('Osaka')}
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
                            onPress={() => handlePressCity('Kyoto')}
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
                            onPress={() => handlePressCity('New York')}
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
                            New York
                        </Text>
                        <Text
                            onPress={() => handlePressCity('Los Angeles')}
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
                            Los Angeles
                        </Text>
                        <Text
                            onPress={() => handlePressCity('Seoul')}
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
                            onPress={() => handlePressCity('Singapore')}
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
                            Singapore
                        </Text>
                        <Text
                            onPress={() => handlePressCity('Hồng Kông')}
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
                            Hồng Kông
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalDestination;
