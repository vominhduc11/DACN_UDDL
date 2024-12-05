import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';

import FastImage from 'react-native-fast-image';
import numeral from 'numeral';
import IconFeather from 'react-native-vector-icons/Feather';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import AwesomeAlert from 'react-native-awesome-alerts';
import Config from '../../.env/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenLoginedAndProduct = ({ navigation, products, setProducts }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [idPackage, setIdPackage] = useState(undefined);
    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };
    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (...param) => {
        const [id, image, name, star, category, cityId, city, packages] = param;
        console.log(id);
        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
            cityName: city,
        });

        const arr = (await AsyncStorage.getItem('product')) ? JSON.parse(await AsyncStorage.getItem('product')) : [];

        if (!arr.some((item) => item.id === id)) {
            if (arr.length === 10) {
                arr.pop();
            }
            arr.unshift({ id: id, image: image, name: name, star: star, category: category, cityId: cityId, city: city, package: packages });
            await AsyncStorage.setItem('product', JSON.stringify(arr));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = arr.filter((item) => item.id === id);
            const remainingElements = arr.filter((item) => item.id !== id);

            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('product', JSON.stringify(newArray));
        }
    };
    // Phần tử để render trong FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
            activeOpacity={1}
            style={{
                flexDirection: 'row',
                borderRadius: scale(12),
                marginTop: verticalScale(12),
            }}
        >
            <FastImage
                style={{
                    height: verticalScale(90),
                    width: verticalScale(90),
                    borderRadius: scale(12),
                }}
                source={{
                    uri: item.image,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ flex: 1, paddingLeft: moderateScale(10) }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '600',
                        color: '#000',
                    }}
                >
                    {item.name}
                </Text>
                <Text numberOfLines={2} style={{ color: '#000', marginTop: 10 }}>
                    {item.name_package}
                </Text>
                {item.quantitys.map((ele, index) => (
                    <Text key={index} style={{ color: '#000' }}>
                        {ele.amount} &times; {ele.age}
                    </Text>
                ))}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            color: '#000',
                            fontSize: moderateScale(16),
                            fontWeight: '600',
                            marginRight: moderateScale(20),
                        }}
                    >
                        đ {formatNumberWithCommas(item.quantitys.reduce((total, item) => total + item.price * item.amount, 0))}
                    </Text>
                    <Text
                        onPress={() => {
                            setIdPackage(item.id_package), setShowAlert(true);
                        }}
                        style={{ padding: 6 }}
                    >
                        <IconFeather name="trash-2" color="red" size={moderateScale(24)} />
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    // Sử lý khi xác nhận xóa sản phẩm trong giỏ hàng
    const handleDeleteProductCart = async (idPackage) => {
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.delete(`${Config.API_URL}/api/deleteProductCart/${idPackage}/${idUser}`);
            const res1 = await axios.get(`${Config.API_URL}/api/getAllProductCart/${idUser}`);
            // Set lại danh sách sản phẩm
            // Đóng Alert
            setProducts(res1.data);
            setShowAlert(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <FlatList
                style={{ paddingHorizontal: moderateScale(12), backgroundColor: '#fff', flex: 1 }}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_package} // Dùng id làm key duy nhất
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            />
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopColor: '#dedede',
                    borderTopWidth: 0.8,
                    elevation: 12,
                    padding: 12,
                }}
            >
                <Text style={{ color: '#000', fontWeight: '700', fontSize: 18 }}>
                    đ{' '}
                    {formatNumberWithCommas(
                        products.reduce((total, item) => {
                            // total + item.price * item.amount
                            return (
                                total +
                                item.quantitys.reduce((total, item) => {
                                    return total + item.price;
                                }, 0)
                            );
                        }, 0)
                    )}
                </Text>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate('Pay', { products })}
                    style={{ backgroundColor: '#FF6600', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 }}
                >
                    <Text style={{ color: '#fff', fontWeight: 700 }}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Thông báo"
                message="Xác nhận xóa dịch vụ này!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Xác nhận"
                confirmButtonColor="#DD6B55"
                onConfirmPressed={() => handleDeleteProductCart(idPackage)}
                showCancelButton={true} // Hiển thị nút hủy
                cancelText="Hủy" // Text của nút hủy
                cancelButtonColor="#A9A9A9" // Màu sắc của nút hủy
                onCancelPressed={() => setShowAlert(false)} // Hàm xử lý khi nhấn nút hủy
            />
        </>
    );
};

export default ScreenLoginedAndProduct;
