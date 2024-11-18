import { View, Text, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { API_URL } from '@env';

const ScheduleHomePage = ({ formatNumberWithCommas, minPricePackage, handlePressProduct, navigation }) => {
    // console.log(API_URL);
    const [city_name, setCity_name] = useState(undefined);
    const [listProduct, setListProduct] = useState([]);

    // Các element sản phẩm FlaList
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package)}
        >
            <View style={{ marginRight: 12 }}>
                <FastImage
                    style={{
                        height: verticalScale(100),
                        width: scale(140),
                        borderRadius: 12,
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text
                    numberOfLines={2}
                    style={{
                        color: '#000',
                        marginTop: moderateScale(8),
                        maxWidth: scale(140),
                        fontWeight: '700',
                        fontSize: moderateScale(14),
                    }}
                >
                    {item.name}
                </Text>
                <View
                    style={{
                        marginTop: moderateScale(12),
                        flexDirection: 'row',
                    }}
                >
                    {item.package.length === 0 && <Text style={{ color: '#ccc', fontWeight: '700', fontSize: moderateScale(14) }}>Đã hết hàng</Text>}
                    {item.package.length > 1 && (
                        <>
                            <Text style={{ fontWeight: '700', color: '#000', marginRight: 2, fontSize: moderateScale(14) }}>Từ </Text>
                            <Text style={{ color: '#000', fontSize: moderateScale(14) }}>
                                đ {formatNumberWithCommas(minPricePackage(item.package))}
                            </Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length > 1 && (
                        <>
                            <Text
                                style={{
                                    fontWeight: '700',
                                    color: '#000',
                                    marginRight: 2,
                                    fontSize: moderateScale(14),
                                }}
                            >
                                Từ{' '}
                            </Text>
                            <Text style={{ color: '#000', fontSize: moderateScale(14) }}>
                                đ {formatNumberWithCommas(minPricePackage(item.package))}
                            </Text>
                        </>
                    )}
                    {item.package.length === 1 && item.package[0].quantitys.length === 1 && (
                        <Text style={{ color: '#000', fontSize: moderateScale(14) }}>đ {formatNumberWithCommas(minPricePackage(item.package))}</Text>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    // Gọi api lần đầu
    useEffect(() => {
        async function fetchData() {
            //Lấy 1 thành phố bất kì
            const res1 = await axios.get(`${API_URL}/api/getCity`);
            setCity_name(res1.data.name);
            // Lấy 10 sản phẩm của thành phố bất kì trên
            const res2 = await axios.get(`${API_URL}/api/getProductOfCity/${1}/10`);
            setListProduct(res2.data);
        }
        fetchData();
    }, []);

    return (
        <View style={{ marginTop: 18, paddingLeft: 16 }}>
            <Text
                style={{
                    fontSize: moderateScale(17),
                    fontWeight: '700',
                    color: '#000',
                }}
                onPress={() => navigation.navigate('Feature_Activity')}
            >
                Tiếp tục lên lịch {city_name}
                <IconEntypo name="chevron-thin-right" size={16} color="#000" />
            </Text>

            {/* Danh sách sản phẩm */}
            <FlatList
                style={{ marginTop: 12 }}
                data={listProduct}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={2}
                removeClippedSubviews={true}
                horizontal
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(ScheduleHomePage);
