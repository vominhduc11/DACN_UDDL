import { View, Text, Animated, TextInput, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import numeral from 'numeral';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScheduleHomePage from '../Component/Home_Page/ScheduleHomePage';
import RecentHomePage from '../Component/Home_Page/RecentHomePage';
import GoSomewhere from '../Component/Home_Page/GoSomewhere';
import SuggestAndRecent from '../Component/Home_Page/SuggestAndRecent';

function Home_page({ navigation }) {
    const [opacity, setOpacity] = useState(0);
    const [active, setActive] = useState(true);
    const [show, setShow] = useState(false);

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
                    toValue: 97, // opacity chuyển đến 1 (hoàn toàn hiện)
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
    const handlePressProduct = useCallback(async (id, image, name, star, category, cityId, city, packages) => {
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

        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
        });
    }, []);

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
                            borderWidth: 2,
                            borderColor: '#00FFFF',
                            borderRadius: 30,
                            paddingHorizontal: 0,
                        }}
                    >
                        <IconFeather name="search" size={20} color="#000" style={{ marginHorizontal: 10 }} />
                        <TextInput
                            style={{
                                width: 130,
                                fontSize: 15,
                                paddingVertical: 5,
                            }}
                            placeholder="Tìm kiếm ..."
                            placeholderTextColor="#000"
                        />
                    </View>
                    <Text onPress={() => navigation.navigate('Cart')}>
                        <IconFeather name="shopping-cart" size={20} color="#000" />
                    </Text>
                    <Text onPress={() => navigation.navigate('Notify')}>
                        <IconAntDesign name="message1" size={20} color="#000" />
                    </Text>
                </View>
                {show && (
                    <View
                        style={{
                            backgroundColor: '#fff',
                            position: 'relative',
                            zIndex: 1,
                            paddingHorizontal: 16,
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
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: active ? '#FF9933' : '#000',
                                }}
                            >
                                Đề xuất
                            </Text>
                            <Text
                                onPress={() => handleChange(false)}
                                style={{
                                    fontSize: 18,
                                    fontWeight: '600',
                                    marginLeft: 30,
                                    color: active ? '#000' : '#FF9933',
                                }}
                            >
                                Gần đây
                            </Text>
                        </View>
                        <View
                            style={{
                                width: 187,
                                height: 4,
                                marginTop: 12,
                            }}
                        >
                            <Animated.View
                                style={{
                                    height: 4,
                                    backgroundColor: '#FF9933',
                                    width: 75,
                                    marginLeft: marginLeft,
                                }}
                            />
                        </View>
                    </View>
                )}
            </View>

            <ScrollView onScroll={handleScrollScreen} showsVerticalScrollIndicator={false}>
                {/* background */}
                <ImageBackground
                    blurRadius={5}
                    style={{
                        height: 200,
                    }}
                    source={{
                        uri: 'https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            marginTop: 100,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                flexBasis: '20%',
                            }}
                        >
                            <IconMaterialIcons name="local-play" size={24} color="#663366" />
                            <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Vui chơi & Trải nghiệm</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconMaterialIcons name="tour" size={24} color="#990000" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Tour</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconMaterialIcons name="directions-boat" size={24} color="#33FFFF" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Du thuyền</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconFontAwesome5 name="hot-tub" size={24} color="#FF9999" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Massage & Suối nước nóng</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconFoundation name="trees" size={24} color="#009933" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Phiêu lưu & khám phá thiên nhiên</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        {/* <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconFontAwesome5 name="swimmer" size={24} color="#0099FF" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>
                                    Massage & Suối nước nóng
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '20%',
                                }}
                            >
                                <IconFontAwesome5 name="landmark" size={24} color="#900" />
                                <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>
                                    Phiêu lưu & khám phá thiên nhiên
                                </Text>
                            </View>
                        </TouchableWithoutFeedback> */}
                    </View>
                </ImageBackground>

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
