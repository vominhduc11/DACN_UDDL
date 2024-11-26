import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { Fragment } from 'react';

import FastImage from 'react-native-fast-image';
import numeral from 'numeral';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyList = ({ route, navigation }) => {
    const { products } = route.params;

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
    // Phần tử để render trong FlatList
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
        <FlatList
            style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 12 }}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} // Dùng id làm key duy nhất
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <Fragment>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: 20, textAlign: 'center', marginTop: 12 }}>
                        Hoạt động ở {products[0].country}
                    </Text>
                    <Text style={{ color: '#000', fontSize: 13, marginBottom: 8, marginTop: 24 }}>{products.length} hoạt động</Text>
                </Fragment>
            )}
        />
    );
};

export default MyList;
