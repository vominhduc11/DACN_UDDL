import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import FastImage from 'react-native-fast-image';

const ScheduleHomePage = ({ formatNumberWithCommas, minPricePackage, handlePressProduct, navigation }) => {
    const [city_name, setCity_name] = useState(undefined);
    const [listProduct1, setListProduct1] = useState([]);

    useEffect(() => {
        async function fetchData() {
            //Lấy 1 thành phố bất kì
            const res1 = await axios.get('http://192.168.0.113:8080/api/getCity');
            setCity_name(res1.data.name);
            // Lấy 10 sản phẩm của thành phố bất kì trên
            const res2 = await axios.get(`http://192.168.0.113:8080/api/getProductOfCity/${1}/10`);
            setListProduct1(res2.data);
        }
        fetchData();
    }, []);
    return (
        <View style={{ marginTop: 18, paddingLeft: 16 }}>
            <Text
                style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: '#000',
                }}
                onPress={() => navigation.navigate('Feature_Activity')}
            >
                Tiếp tục lên lịch {city_name}
                <IconEntypo name="chevron-thin-right" size={16} color="#000" />
            </Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                    {/* element */}
                    {listProduct1.map((product) => (
                        <TouchableWithoutFeedback
                            key={product.id}
                            onPress={() =>
                                handlePressProduct(
                                    product.id,
                                    product.image,
                                    product.name,
                                    product.star,
                                    product.category,
                                    product.cityId,
                                    product.city,
                                    product.package
                                )
                            }
                        >
                            <View style={{ marginRight: 12 }}>
                                <FastImage
                                    style={{
                                        height: 100,
                                        width: 130,
                                        borderRadius: 12,
                                    }}
                                    source={{ uri: product.image, priority: FastImage.priority.high }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <Text
                                    numberOfLines={2}
                                    style={{
                                        color: '#000',
                                        marginTop: 8,
                                        maxWidth: 130,
                                        fontWeight: '700',
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <View
                                    style={{
                                        marginTop: 12,
                                        flexDirection: 'row',
                                    }}
                                >
                                    {product.package.length === 0 && <Text style={{ color: '#ccc', fontWeight: '700' }}>Đã hết hàng</Text>}
                                    {product.package.length > 1 && (
                                        <>
                                            <Text style={{ fontWeight: '700', color: '#000', marginRight: 2 }}>Từ </Text>
                                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(product.package))}</Text>
                                        </>
                                    )}
                                    {product.package.length === 1 && product.package[0].quantitys.length > 1 && (
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
                                            <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(product.package))}</Text>
                                        </>
                                    )}
                                    {product.package.length === 1 && product.package[0].quantitys.length === 1 && (
                                        <Text style={{ color: '#000' }}>đ {formatNumberWithCommas(minPricePackage(product.package))}</Text>
                                    )}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(ScheduleHomePage);
