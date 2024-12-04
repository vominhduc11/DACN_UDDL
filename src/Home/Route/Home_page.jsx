import { View, Text, Animated, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScheduleHomePage from '../Component/Home_Page/ScheduleHomePage';
import RecentHomePage from '../Component/Home_Page/RecentHomePage';
import GoSomewhere from '../Component/Home_Page/GoSomewhere';
import SuggestAndRecent from '../Component/Home_Page/SuggestAndRecent';
import BackgroundMain from '../Component/Home_Page/BackgroundMain';
import { moderateScale, scale } from 'react-native-size-matters';

function Home_page({ navigation }) {
    const [opacity, setOpacity] = useState(0);
    const [active, setActive] = useState(true);
    const [show, setShow] = useState(false);
    const [unviewedCartCount, setUnviewedCartCount] = useState(0);

    // Thẻ để xuất và gần đây trong SuggestAndRecent
    const viewRef = useRef(null);
    // Thẻ viewPaper trong component tabView
    const pagerViewRef = useRef();
    // useImperativeHandle trong component tab view
    const childRef = useRef();
    // useImperativeHandle trong component RecentHomePage
    const childRef1 = useRef();

    // Thẻ đề xuất gần đây
    const marginLeft = useRef(new Animated.Value(0)).current;

    // Xử lý khi nhấn vào gần đây và gợi ý
    const handleChange = useCallback((param) => {
        setActive(param);
        if (param) {
            // Set page 0 nếu param là true
            pagerViewRef.current.setPage(0);
            Animated.parallel([
                Animated.timing(marginLeft, {
                    toValue: 0, // opacity chuyển đến 1 (hoàn toàn hiện)
                    duration: 300, // thời gian hiệu ứng là 1 giây
                    useNativeDriver: false,
                }),
            ]).start(); // Kích hoạt animation

            // Set product 3
            childRef.current.setHeight1();
        } else {
            // Set page 1 nếu param là false
            pagerViewRef.current.setPage(1);
            Animated.parallel([
                Animated.timing(marginLeft, {
                    toValue: 106, // opacity chuyển đến 1 (hoàn toàn hiện)
                    duration: 300, // thời gian hiệu ứng là 1 giây
                    useNativeDriver: false,
                }),
            ]).start(); // Kích hoạt animation

            //Set product4
            if (childRef.current.getListProduct4.length === 0) {
                childRef.current.fetchInTurnProduct2();
            } else {
                childRef.current.setHeight2();
            }
        }
    }, []);

    //Sử lý khi cuộn màn hình trong home_page
    function handleScrollScreen(event) {
        // Kiểm tra nếu người dùng đã cuộn đến cuối
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

        if (Math.floor(layoutMeasurement.height + contentOffset.y) >= Math.floor(contentSize.height)) {
            if (active) {
                childRef.current.fetchInTurnProduct1();
            } else {
                childRef.current.fetchInTurnProduct2();
            }
        } else {
            // setFetch(false);
        }
        // Ẩn hiện show
        viewRef.current.measureInWindow((x, y, width, height) => {
            if (y <= 78.52) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        // set độ mờ cho thanh header
        setOpacity(contentOffset.y / 123);
    }

    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Tìm gía nhỏ nhất trong gói
    const minPricePackage = useCallback((data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }, []);

    //Chuyển thành kiểu tiền tệ
    const formatNumberWithCommas = useCallback((number) => {
        return numeral(number).format('0,0');
    }, []);

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = useCallback(async (...param) => {
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
    }, []);

    // Set lại danh sách sản phẩm trong AsyncStorage khi focus lại trang
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            // Set giá trị sản phẩm giỏ hàng chưa xem
            if (await AsyncStorage.getItem('unviewedCartCount')) {
                setUnviewedCartCount(JSON.parse(await AsyncStorage.getItem('unviewedCartCount')));
            } else {
                setUnviewedCartCount(0);
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <>
            {/* thanh tiềm kiếm , giỏ hàng, thông báo*/}
            <View style={{ zIndex: 2, position: 'absolute', top: 0, right: 0, left: 0 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 30,
                        paddingVertical: 18,
                        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                        borderBottomWidth: 1,
                        borderBottomColor: `rgba(238, 238, 238, ${opacity})`,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: scale(2),
                            borderColor: '#ff4343',
                            borderRadius: 30,
                            paddingHorizontal: 0,
                        }}
                    >
                        <IconFeather name="search" size={20} color="#000" style={{ marginHorizontal: 10 }} />
                        <TextInput
                            style={{
                                width: scale(160),
                                fontSize: 15,
                                paddingVertical: moderateScale(5),
                                paddingRight: moderateScale(12),
                            }}
                            placeholder="Tìm kiếm ..."
                            placeholderTextColor="#000"
                        />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <IconFeather name="shopping-cart" size={moderateScale(20)} color="#000" />
                        {unviewedCartCount === 0 || (
                            <View
                                style={{
                                    position: 'absolute',
                                    backgroundColor: 'red',
                                    width: 16,
                                    height: 16,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 30,
                                    top: -10,
                                    left: 14,
                                }}
                            >
                                <Text style={{ fontSize: 10, fontWeight: '700' }}>{unviewedCartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Notify')}>
                        <IconAntDesign name="message1" size={moderateScale(20)} color="#000" />
                    </Text>
                </View>
                {show && (
                    <View
                        style={{
                            backgroundColor: '#fff',
                            position: 'relative',
                            zIndex: 1,
                            paddingHorizontal: moderateScale(16),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                onPress={() => {
                                    handleChange(true);
                                }}
                                style={{
                                    fontSize: moderateScale(18),
                                    fontWeight: '600',
                                    paddingHorizontal: moderateScale(5),
                                    color: active ? '#FF9933' : '#000',
                                }}
                            >
                                Đề xuất
                            </Text>
                            <Text
                                onPress={() => handleChange(false)}
                                style={{
                                    fontSize: moderateScale(18),
                                    fontWeight: '600',
                                    paddingHorizontal: moderateScale(5),
                                    marginLeft: moderateScale(30),
                                    color: active ? '#000' : '#FF9933',
                                }}
                            >
                                Gần đây
                            </Text>
                        </View>
                        <View
                            style={{
                                width: scale(160),
                                height: 4,
                                marginTop: 12,
                                // backgroundColor: 'red',
                            }}
                        >
                            <Animated.View
                                style={{
                                    height: 4,
                                    backgroundColor: '#FF9933',
                                    width: scale(70),
                                    marginLeft: marginLeft,
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>

            <ScrollView onScroll={handleScrollScreen} showsVerticalScrollIndicator={false}>
                {/* background */}
                <BackgroundMain navigation={navigation} />

                <View
                    style={{
                        backgroundColor: '#fff',
                        flex: 1,
                    }}
                >
                    {/* Tiếp tục lên ... */}
                    <ScheduleHomePage
                        formatNumberWithCommas={formatNumberWithCommas}
                        minPricePackage={minPricePackage}
                        handlePressProduct={handlePressProduct}
                        navigation={navigation}
                    />
                    {/* Xem gần đây */}
                    <RecentHomePage handlePressProduct={handlePressProduct} navigation={navigation} ref={childRef1} />
                    {/* Bạn muốn đi đâu chơi */}
                    <GoSomewhere navigation={navigation} />

                    {/* Đề xuất và gần đây */}
                    <SuggestAndRecent
                        active={active}
                        marginLeft={marginLeft}
                        formatNumberWithCommas={formatNumberWithCommas}
                        minPricePackage={minPricePackage}
                        handlePressProduct={handlePressProduct}
                        ref={childRef}
                        pagerViewRef={pagerViewRef}
                        viewRef={viewRef}
                        handleChange={handleChange}
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default Home_page;
