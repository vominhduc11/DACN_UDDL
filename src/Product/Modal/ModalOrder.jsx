import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalOrder = ({
    product,
    cityId,
    cityName,
    modalVisible1,
    package_service,
    quantity,
    counts,
    setModalVisible1,
    setCounts,
    formatNumberWithCommas,
    countsInit,
    navigation,
}) => {
    // Xử lý khi đóng modal
    const handleCloseModal = () => {
        setModalVisible1(false);
        setCounts(countsInit);
    };
    // Thay đổi số lượng
    const handleChange = (index, newCount) => {
        const updatedCounts = [...counts];
        updatedCounts[index] = newCount;
        setCounts(updatedCounts);
    };
    // Tạo mảng quantity thêm trường amount
    const setQuantity = () => {
        console.log(package_service);
        const result = package_service.quantitys
            .map((quantity, index) => {
                if (counts[index] !== 0) {
                    quantity.amount = counts[index];
                    return quantity;
                }
                return null; // Trả về null cho các phần tử không đạt điều kiện
            })
            .filter((quantity) => quantity !== null); // Loại bỏ các phần tử null

        return result;
    };
    // Xử lý khi bấm vào order
    const handleOrder = () => {
        const products = [
            {
                image: product.image,
                quantitys: setQuantity(),
                package: product.package_services,
                name_package: package_service.name,
                star: product.star,
                city: cityName,
                name: product.name,
                id: product.id,
                cityId: cityId,
                category: product.category,
                id_package: package_service.id,
            },
        ];
        // Đóng modal hiện tại
        setModalVisible1(false);
        // Chuyển sang trang Pay
        navigation.navigate('Pay', { products });
    };

    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none'
            transparent={true}
            visible={modalVisible1}
        >
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    flex: 1,
                    position: 'relative',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#000',
                            fontSize: 16,
                            paddingVertical: 12,
                            borderBottomWidth: 0.5,
                        }}
                    >
                        Tùy chọn đơn hàng
                    </Text>
                    <View style={{ paddingHorizontal: 12, marginTop: 12 }}>
                        <Text
                            style={{
                                color: '#000',
                                fontWeight: '700',
                                fontSize: 18,
                            }}
                        >
                            {package_service.name}
                        </Text>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#dedede',
                                paddingHorizontal: 12,
                                borderRadius: 12,
                                marginTop: 12,
                            }}
                        >
                            {quantity.map((ele, index) => (
                                <View
                                    key={ele.id}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                    }}
                                >
                                    <Text style={{ maxWidth: 100, fontSize: 12, color: '#000' }}>{ele.age}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ color: '#000' }}>{formatNumberWithCommas(ele.price)}</Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginLeft: 8,
                                            }}
                                        >
                                            {/* Nút trừ */}
                                            <TouchableOpacity onPress={() => handleChange(index, Math.max(countsInit[index], counts[index] - 1))}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 10,
                                                        borderRadius: 8,
                                                    }}
                                                >
                                                    <Icon name="minus" size={12} color="#b4b4b4" />
                                                </View>
                                            </TouchableOpacity>

                                            {/* Hiển thị số ở giữa */}
                                            <Text style={{ marginHorizontal: 8, color: '#ccc' }}>{counts[index]}</Text>

                                            {/* Nút cộng */}
                                            <TouchableOpacity onPress={() => handleChange(index, counts[index] + 1)}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#f5f5f5',
                                                        paddingHorizontal: 12,
                                                        paddingVertical: 10,
                                                        borderRadius: 8,
                                                    }}
                                                >
                                                    <Icon name="plus" size={12} color="#b4b4b4" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 12,
                            marginTop: 12,
                            borderTopWidth: 1,
                            borderTopColor: '#dedede',
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '600',
                                color: '#000',
                                fontSize: 18,
                                marginVertical: 10,
                            }}
                        >
                            <Text style={{ textDecorationLine: 'underline' }}>đ</Text>{' '}
                            {formatNumberWithCommas(
                                counts.reduce((accumulator, currentValue, index) => {
                                    return accumulator + currentValue * quantity[index].price;
                                }, 0)
                            )}
                        </Text>
                        <TouchableOpacity onPress={handleOrder} activeOpacity={0.6} style={{ marginBottom: 12 }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: '#ff5c01',
                                    color: '#fff',
                                    paddingVertical: 12,
                                    borderRadius: 12,
                                }}
                            >
                                Đặt ngay
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <IconAntDesign
                        onPress={handleCloseModal}
                        name="close"
                        size={20}
                        color="#000"
                        style={{ position: 'absolute', top: 12, left: 12 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default memo(ModalOrder);
