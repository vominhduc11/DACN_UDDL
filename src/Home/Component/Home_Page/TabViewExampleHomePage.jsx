import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import FastImage from 'react-native-fast-image';
import PagerView from 'react-native-pager-view';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';

const TabViewExampleHomePage = ({ formatNumberWithCommas, minPricePackage, handlePressProduct, pagerViewRef }, ref) => {
    const [heightPagerView, setHeightPagerView] = useState(1200);
    const [listProduct3, setListProduct3] = useState([]);
    const [listProduct4, setListProduct4] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [amountProduct1, setAmountProduct1] = useState(10);
    const [amountProduct2, setAmountProduct2] = useState(10);

    const heightRef1 = useRef(0);
    const heightRef2 = useRef(0);

    useImperativeHandle(ref, () => ({
        setHeight1() {
            setHeightPagerView(heightRef1.current);
        },
        setHeight2() {
            setHeightPagerView(heightRef2.current);
        },
        fetchInTurnProduct1() {
            fetchInTurnProduct1();
        },
        fetchInTurnProduct2() {
            fetchInTurnProduct2();
        },
        getListProduct4() {
            return listProduct4;
        },
    }));

    //  Lấy kích thước thẻ 1
    const handleLayout1 = (event) => {
        const { height } = event.nativeEvent.layout;
        if (height === 0) {
            return;
        }
        heightRef1.current = height + 20;
        setHeightPagerView(height + 20);
    };

    //  Lấy kích thước thẻ 2
    const handleLayout2 = (event) => {
        const { height } = event.nativeEvent.layout;
        if (height === 0) {
            return;
        }
        heightRef2.current = height + 20;
        setHeightPagerView(height + 20);
    };

    // Gọi api
    const fetchInTurnProduct1 = async () => {
        if (loading1) {
            return;
        }

        setLoading1(true);

        try {
            const res = await axios.get(`http://192.168.0.113:8080/api/getInTurnProduct/${amountProduct1}`);
            setListProduct3(res.data);
            setAmountProduct1(amountProduct1 + 10);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading1(false);
        }
    };

    async function fetchInTurnProduct2() {
        if (loading2) {
            return;
        }

        setLoading2(true);
        try {
            Geolocation.getCurrentPosition((position) => getPosition(position.coords.latitude, position.coords.longitude));

            async function getPosition(...params) {
                const res1 = await axios.get(
                    `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${params[0]},${params[1]}&lang=vi-VN&apiKey=oX3CYSdcd1kzHo9iAiGTKzYCSetABD5KuCAkPUN6QrQ`
                );

                const res2 = await axios.get(`http://192.168.0.113:8080/api/getCityByName/${res1.data.items[0].address.county}`);
                const res3 = await axios.get(`http://192.168.0.113:8080/api/getInTurnProductOfCity/${res2.data.id}/${amountProduct2}`);
                setListProduct4(res3.data);
                setAmountProduct2(amountProduct2 + 10);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading2(false);
        }
    }

    useEffect(() => {
        fetchInTurnProduct1();
    }, []);

    return (
        <PagerView ref={pagerViewRef} style={{ height: heightPagerView }} initialPage={0} scrollEnabled={false}>
            <View
                onLayout={handleLayout1}
                key="1"
                style={{
                    marginTop: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {listProduct3.map((product) => (
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
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <View>
                                <FastImage
                                    style={{
                                        height: 100,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                    }}
                                    source={{ uri: product.image, priority: FastImage.priority.high }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        bottom: 6,
                                        left: 6,
                                    }}
                                >
                                    <IconFontisto name="map-marker-alt" size={16} color="#fff" />
                                    <Text style={{ color: '#fff', fontSize: 12, marginLeft: 5 }}>{product.city}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        height: 58,
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <Text style={{ marginTop: 6, color: '#000' }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
                                    <Text
                                        style={{
                                            color: '#FFCC33',
                                        }}
                                    >
                                        {product.star}
                                    </Text>{' '}
                                    ({product.booked})
                                </Text>
                                <View
                                    style={{
                                        marginTop: 6,
                                        color: '#000',
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
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <View
                onLayout={handleLayout2}
                key="2"
                style={{
                    marginTop: 24,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {listProduct4.map((product) => (
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
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <View>
                                <FastImage
                                    style={{
                                        height: 100,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                    }}
                                    source={{ uri: product.image, priority: FastImage.priority.high }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        position: 'absolute',
                                        bottom: 6,
                                        left: 6,
                                    }}
                                >
                                    <IconFontisto name="map-marker-alt" size={16} color="#fff" />
                                    <Text style={{ color: '#fff', fontSize: 12, marginLeft: 5 }}>{product.city}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        height: 58,
                                    }}
                                >
                                    {product.name}
                                </Text>
                                <Text style={{ marginTop: 6, color: '#000' }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
                                    <Text
                                        style={{
                                            color: '#FFCC33',
                                        }}
                                    >
                                        {product.star}
                                    </Text>{' '}
                                    ({product.booked})
                                </Text>
                                <View
                                    style={{
                                        marginTop: 6,
                                        color: '#000',
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
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </PagerView>
    );
};

export default memo(forwardRef(TabViewExampleHomePage));
