import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

import FastImage from 'react-native-fast-image';
import IconFeather from 'react-native-vector-icons/Feather';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const ScreenLoginedAndProduct = ({ navigation, products }) => {
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
        childRef1.current.setListProduct2(JSON.parse(await AsyncStorage.getItem('product')));
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
                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ flex: 1, paddingLeft: moderateScale(10) }}>
                <Text
                    style={{
                        fontSize: moderateScale(16),
                        fontWeight: '600',
                        color: '#000',
                    }}
                >
                    {item.name}
                </Text>
                <Text style={{ color: '#000', marginTop: 10 }}>{item.name_package}</Text>
                {JSON.parse(item.quantity).map((ele) => (
                    <Text style={{ color: '#000' }}>
                        {ele.amount} &times; {ele.name}
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
                        đ {formatNumber(JSON.parse(item.quantity).reduce((total, item) => total + item.price * item.amount, 0))}
                    </Text>
                    <Text style={{ padding: 6 }}>
                        <IconFeather name="trash-2" color="red" size={moderateScale(24)} />
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <FlatList
            style={{ paddingHorizontal: moderateScale(12), backgroundColor: '#fff', flex: 1 }}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            windowSize={3}
            removeClippedSubviews={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ScreenLoginedAndProduct;
