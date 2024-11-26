import { View, Text, TouchableWithoutFeedback, Modal, FlatList, TouchableOpacity, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import React, { Fragment, useState } from 'react';
import FastImage from 'react-native-fast-image';
import numeral from 'numeral';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../../.env/Config';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';

const LoggedAndProduct = ({ products, navigation, setProducts }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [idProduct, setIdProduct] = useState(undefined);
    // Hàm format giá tiền
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };
    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = (data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    };
    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };
    // Hàm sử lý mảng sản phẩm thành mảng hình ảnh trong danh sách của tôi
    const transformedData = () =>
        Object.values(
            products.reduce((acc, product) => {
                if (!acc[product.country]) {
                    acc[product.country] = { country: product.country, images: [] };
                }
                acc[product.country].images.push(product.image);
                return acc;
            }, {})
        );
    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (...param) => {
        const [id, image, name, star, category, cityId, city, packages] = param;
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
    // Xử lý xóa sản phẩm yêu thích
    const handleDeleteLike = async () => {
        try {
            // Xóa sản phẩm yêu thích
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            await axios.delete(`${Config.API_URL}/api/deleteProductFavorite/${idUser}/${idProduct}`);
            // set lại danh sách sản phẩm
            const res = await axios.get(`${Config.API_URL}/api/getAllProductFavorite/${idUser}`);
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setShowAlert(false);
        }
    };
    // Phần tử để render trong FlatList
    const renderItemMyList = ({ item }) => (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyList', { products: products.filter((product) => product.country === item.country) })}
            style={{ width: 180, borderWidth: 1, borderColor: '#dedede', borderRadius: 14, overflow: 'hidden' }}
        >
            {item.images.length < 3 && (
                <View style={{ flexDirection: 'row' }}>
                    {item.images.map((image, index) => (
                        <Fragment key={index}>
                            <View style={{ width: index === 0 ? 0 : 2 }} />
                            <Image
                                style={{ flex: 1 }}
                                height={120}
                                source={{
                                    uri: image,
                                }}
                            />
                        </Fragment>
                    ))}
                </View>
            )}

            {item.images.length >= 3 && (
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ flex: 1 }}
                        height={120}
                        source={{
                            uri: item.images[0],
                        }}
                    />
                    <View style={{ width: 2 }} />
                    <View style={{ flex: 1 }}>
                        <Image
                            style={{ flex: 1 }}
                            height={120}
                            source={{
                                uri: item.images[1],
                            }}
                        />
                        <View style={{ height: 2 }} />
                        <ImageBackground
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            source={{
                                uri: item.images[2],
                            }}
                        >
                            {/* Các thành phần khác hiển thị trên ảnh nền */}
                            {item.images.length > 3 && (
                                <View
                                    style={{
                                        backgroundColor: 'rgba(0,0,0,0.4)',
                                        position: 'absolute',
                                        top: 0,
                                        bottom: 0,
                                        right: 0,
                                        left: 0,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff' }}>+{item.images.length - 2}</Text>
                                </View>
                            )}
                        </ImageBackground>
                    </View>
                </View>
            )}
            <View style={{ padding: 12 }}>
                <Text style={{ color: '#000', fontSize: 17, fontWeight: '700' }} numberOfLines={1}>
                    Hoạt động ở {item.country}
                </Text>
                <Text style={{ color: '#000' }}>{item.images.length} hoạt động</Text>
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => handlePressProduct(item.idProduct, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
            activeOpacity={1}
            style={{
                flexDirection: 'row',
                borderRadius: scale(12),
                marginTop: verticalScale(12),
            }}
        >
            <View>
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
                <IconAntDesign
                    onPress={() => {
                        setIdProduct(item.idProduct), setShowAlert(true);
                    }}
                    name="heart"
                    size={moderateScale(25)}
                    color="red"
                    style={{
                        position: 'absolute',
                        right: scale(12),
                        top: verticalScale(12),
                    }}
                />
            </View>
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
                <View style={{ marginTop: 6, flexDirection: 'row' }}>
                    <Text
                        style={{
                            color: '#fe9428',
                            fontWeight: '600',
                        }}
                    >
                        <IconAntDesign name="star" color="#fe9428" />
                        {item.star}
                    </Text>
                    <Text style={{ color: '#747878' }}>
                        ({item.evaluate})
                        <IconEntypo name="dot-single" />
                        {formatNumber(item.booked)} Đã được đặt
                    </Text>
                </View>
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
                            marginRight: moderateScale(20),
                        }}
                    >
                        {item.package.length === 0 && <Text style={{ color: '#ccc', fontWeight: '700' }}>Đã hết hàng</Text>}
                        {item.package.length > 1 && (
                            <>
                                <Text style={{ fontWeight: '700', color: '#000', marginRight: 2 }}>Từ </Text>
                                <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                            </>
                        )}
                        {item.package.length === 1 && item.package[0].quantitys.length > 1 && (
                            <>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        color: '#000',
                                        marginRight: 2,
                                    }}
                                >
                                    Từ{' '}
                                </Text>
                                <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                            </>
                        )}
                        {item.package.length === 1 && item.package[0].quantitys.length === 1 && (
                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                        )}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 12 }}>
                <View
                    style={{
                        paddingTop: 30,
                        paddingBottom: 15,
                    }}
                >
                    <Text style={{ fontSize: 24, fontWeight: '700', color: '#000' }}>Yêu thích</Text>
                </View>

                <ScrollView>
                    <Text style={{ color: '#000', fontSize: 19, fontWeight: '700' }}>Danh sách của tôi</Text>
                    <FlatList
                        style={{ backgroundColor: '#fff', flex: 1, marginTop: 14 }}
                        data={transformedData()}
                        renderItem={renderItemMyList}
                        keyExtractor={(item, index) => index} // Dùng id làm key duy nhất
                        initialNumToRender={2}
                        maxToRenderPerBatch={1}
                        windowSize={3}
                        removeClippedSubviews={true}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
                        horizontal
                    />

                    <FlatList
                        style={{ backgroundColor: '#fff', flex: 1, marginTop: 24 }}
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id_package} // Dùng id làm key duy nhất
                        initialNumToRender={1}
                        maxToRenderPerBatch={1}
                        windowSize={3}
                        removeClippedSubviews={true}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        ListHeaderComponent={() => <Text style={{ color: '#000', fontSize: 19, fontWeight: '700' }}>Các mục đã lưu</Text>}
                    />
                </ScrollView>
            </View>
            {/* Modal */}
            <Modal
                animationType="fade" // Loại animation: 'slide', 'fade', 'none'
                transparent={true} // Modal hiển thị trên nền trong suốt
                visible={modalVisible} // Kiểm soát trạng thái hiển thị của Modal
                onRequestClose={() => {
                    // Được gọi khi nhấn nút back trên Android
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <View
                        style={{
                            margin: 20,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            padding: 30,
                            alignItems: 'center',
                            elevation: 5, // Đổ bóng
                        }}
                    >
                        <Text
                            style={{
                                marginBottom: 15,
                                textAlign: 'center',
                                fontWeight: '600',
                                fontSize: 20,
                            }}
                        >
                            Xóa khỏi danh sách yếu thích?
                        </Text>

                        <Text>Hoạt động sẽ được xóa khỏi danh sách mà bạn đã lưu vào</Text>

                        {/* Nút đóng Modal */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 12,
                                justifyContent: 'space-between',
                                // backgroundColor: '#000',
                                width: '100%',
                            }}
                        >
                            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                <Text
                                    style={{
                                        borderWidth: 1,
                                        color: '#000',
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderRadius: 8,
                                        width: 100,
                                        textAlign: 'center',
                                    }}
                                >
                                    Quay lại
                                </Text>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => {}}>
                                <Text
                                    style={{
                                        color: '#fff',
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderRadius: 8,
                                        width: 100,
                                        textAlign: 'center',
                                        backgroundColor: '#ff5b00',
                                    }}
                                >
                                    Xóa
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Thông báo khi xóa sản phẩm yêu thích */}
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="Xóa khỏi danh sách yêu thích!"
                message="Hoạt động sẽ được xóa khỏi danh sách đã lưu"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Xóa"
                confirmButtonColor="#CC3333"
                onConfirmPressed={handleDeleteLike}
            />
        </>
    );
};

export default LoggedAndProduct;
